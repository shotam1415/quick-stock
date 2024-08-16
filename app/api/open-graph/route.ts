import { NextRequest } from 'next/server';

import { parse } from 'node-html-parser';

// import { Metatag } from '@/types/data';
import { formSchema } from '@/app/_validations/form-schema';

const setImagePath = (url: string, imageUrl: string) => {
    if (!imageUrl) return imageUrl;

    const { protocol, host } = new URL(url);
    return new URL(imageUrl, `${protocol}//${host}`).toString();
};

export const runtime = 'edge';

export async function GET(request: NextRequest) {
    const urlParam = request.nextUrl.searchParams.get('url');
    const validationResult = formSchema.safeParse({ url: urlParam });

    if (!validationResult.success) {
        return new Response(`The URL ${urlParam} is missing.`, { status: 400 });
    }

    const url = validationResult.data.url;
    try {
        const response = await fetch(url, {
            headers: { 'User-Agent': 'Googlebot' },
        });
        const html = await response.text();
        console.log(html);

        if (!html) {
            return new Response(
                JSON.stringify({ title: url, description: '', image: '' })
            );
        }
        const metaTags: { [key: string]: string | boolean } = extractMetaTags(
            html,
            url
        );
        return new Response(JSON.stringify(metaTags));
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}

const allowedTags = [
    'title',
    'og:title',
    'twitter:title',
    'description',
    'og:description',
    'twitter:description',
    'og:image',
    'twitter:image',
    'icon',
    'apple-touch-icon',
    'shortcut icon',
];

function extractMetaTags(html: string, url: string) {
    const root = parse(html);
    const objectMap: { [key: string]: string } = {};

    root
        .querySelectorAll('meta')
        .forEach(({ attributes }: { attributes: { [key: string]: string } }) => {
            const property =
                attributes.property || attributes.name || attributes.href;
            if (!objectMap[property] && allowedTags.includes(property)) {
                objectMap[property] = attributes.content;
            }
        });

    root
        .querySelectorAll('link')
        .forEach(({ attributes }: { attributes: { [key: string]: string } }) => {
            const { rel, href } = attributes;
            if (rel && href && allowedTags.includes(rel)) {
                objectMap[rel] = href;
            }
        });

    const title =
        objectMap['og:title'] ||
        objectMap['twitter:title'] ||
        root.querySelector('title')?.innerText ||
        url;

    const description =
        objectMap['og:description'] || objectMap['description'] || '';

    const imageSrc =
        objectMap['og:image'] ||
        objectMap['twitter:image'] ||
        objectMap['apple-touch-icon'] ||
        objectMap['icon'] ||
        objectMap['shortcut icon'];

    const favIconImage =
        objectMap['apple-touch-icon'] ||
        objectMap['icon'] ||
        objectMap['shortcut icon'];

    const ogp = setImagePath(url, imageSrc);

    return {
        title,
        description,
        ogp,
        ...(ogp && { is_fallback: imageSrc === favIconImage }),
    };
}