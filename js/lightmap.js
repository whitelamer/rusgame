//generates a lightmap based on a heightmap input
function generateTexture( data, width, height, intensity, sun ) {

    var canvas, canvasScaled, context, image, imageData,base, vector3, sun, shade;

    base = 255 - intensity;

    vector3 = new THREE.Vector3( 0, 0, 0 );

    sun.normalize();

    canvas = document.createElement( 'canvas' );
    canvas.width = width;
    canvas.height = height;

    context = canvas.getContext( '2d' );
    context.fillRect( 0, 0, width, height );

    image = context.getImageData( 0, 0, canvas.width, canvas.height );
    imageData = image.data;

    for ( var i = 0, j = 0, l = imageData.length; i < l; i += 4, j ++ ) {

       vector3.x = data[ j - 2 ] - data[ j + 2 ];
     vector3.y = 2;
      vector3.z = data[ j - width * 2 ] - data[ j + width * 2 ];
        vector3.normalize();

        shade = vector3.dot( sun );

        imageData[ i ] = ( base + shade * intensity );
        imageData[ i + 1 ] = ( base + shade * intensity );
        imageData[ i + 2 ] = ( base + shade * intensity ) ;
    }

    context.putImageData( image, 0, 0 );

    // Scaled 4x
    canvasScaled = document.createElement( 'canvas' );
    canvasScaled.width = width * 4;
    canvasScaled.height = height * 4;

    context = canvasScaled.getContext( '2d' );
    context.scale( 4, 4 );
    context.drawImage( canvas, 0, 0 );

    image = context.getImageData( 0, 0, canvasScaled.width, canvasScaled.height );
    imageData = image.data;

    for ( var i = 0, l = imageData.length; i < l; i += 4 ) {

        var v = ~~ ( Math.random() * 25 );

        imageData[ i ] += v;
        imageData[ i + 1 ] += v;
        imageData[ i + 2 ] += v;

    }

    context.putImageData( image, 0, 0 );

    return canvasScaled;
}
