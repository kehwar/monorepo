import type { ImageOptions, ImageSizes } from '@nuxt/image'

export function getImageProps() {
    return {
        tile: {
            fit: 'cover',
            format: 'webp',
            width: 200,
            height: 200,
            modifiers: {
                fit: 'cover',
                format: 'webp',
                width: 200,
                height: 200,
                rotate: null,
            },
        },
        full: {
            sizes: '100vw sm:50vw md:400px lg:800px',
            fit: 'inside',
            format: 'webp',
            modifiers: {
                fit: 'inside',
                format: 'webp',
                rotate: null,
            },
        },
    } satisfies Record<string, ImageProps>
}

type ImageProps = Partial<ImageOptions & ImageSizes>
