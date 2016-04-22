function imageFactory() {
    
    return {
        loadImage: loadImage
    };
    
    function loadImage(source) {
        var element = $('#dicomImage').get(0),
            loaded = false;
            
        cornerstone.enable(element);
        
        cornerstone.loadAndCacheImage("wadouri:" + source).then(function(image) {
            var viewport = cornerstone.getDefaultViewportForImage(element, image);
            cornerstone.displayImage(element, image, viewport);

            if (loaded === false) {
                cornerstoneTools.mouseInput.enable(element);
                cornerstoneTools.mouseWheelInput.enable(element);
                cornerstoneTools.wwwc.activate(element, 1);
                cornerstoneTools.pan.activate(element, 2);
                cornerstoneTools.zoom.activate(element, 4);
                cornerstoneTools.zoomWheel.activate(element);
                loaded = true;
            }
        });
    }
}

module.exports = imageFactory;