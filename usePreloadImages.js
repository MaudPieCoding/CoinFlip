import {useEffect} from 'react';

const usePreloadImages = (imageSrcs) => {
    useEffect(() => {
        const key = Symbol();
        window.usePreloadImagesData = window.usePreloadImagesData ?? {};
        window.usePreloadImagesData[key] = [];
        for (const src of imageSrcs) {
            const img = new Image();
            img.src = src;
            window.usePreloadImagesData[key].push(img);
        }
        return () => {
            delete window.usePreloadImagesData?.[key];
        };
    }, [imageSrcs]);
};

export default usePreloadImages;