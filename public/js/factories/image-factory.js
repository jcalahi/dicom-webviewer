function imageFactory($http, PACS_API) {
    
    return {
        loadImage: loadImage,
        setPath: setPath
    };
    /**
     * Renders DICOM images from the specified URL
     * @param {String} source - URL of the image
     */
    function loadImage(source) {
        var element = $('#dicomImage').get(0),
            loaded = false;
            
        cornerstone.enable(element);
        
        // cornerstone.loadAndCacheImage("wadouri:" + source).then(function(image) {
        //     var viewport = cornerstone.getDefaultViewportForImage(element, image);
        //     cornerstone.displayImage(element, image, viewport);

        //     if (loaded === false) {
        //         cornerstoneTools.mouseInput.enable(element);
        //         cornerstoneTools.mouseWheelInput.enable(element);
        //         cornerstoneTools.wwwc.activate(element, 1);
        //         cornerstoneTools.pan.activate(element, 2);
        //         cornerstoneTools.zoom.activate(element, 4);
        //         cornerstoneTools.zoomWheel.activate(element);
        //         loaded = true;
        //     }
        // });
        
    }
    
    function setPath(path) {
        var config = {
            method: 'POST',
            url: PACS_API,
            data: path
        };
        
        return $http(config).then(function(res) {
            return res;
        });
    }
}

module.exports = imageFactory;