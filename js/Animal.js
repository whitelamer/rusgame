Animal = function (model, x, y, z) {
    this.waypoint=new THREE.Vector2(Math.random() * heightMapSize-heightMapSize/2, Math.random() * heightMapSize-heightMapSize/2);
    this.direction=new THREE.Vector3(0, 0, 0);
    this.x=x;
    this.y=y;
    this.z=z;
    this.mesh=null;
    this.offset=Math.random() * 6;
    this.duration=1000;
    this.file=model;
    this.spline=null;
    this.t=0.0;
    this.clock = new THREE.Clock();
};
Animal.prototype = {
    constructor: Animal,
    setModel: function ( model ,materials) {
                  this.mesh = new THREE.Mesh( model, new THREE.MeshLambertMaterial( { color: 0x606060, morphTargets: true,wrapAround: true }));
                  this.mesh.scale.set( 0.01, 0.01, 0.01 );
                  this.mesh.position.set(this.x, this.y, this.z);
                  this.mesh.up.set(0, 0, 1);
                  this.mesh.lookAt(new THREE.Vector3(1, 0, this.z));
                  terrain[0].add( this.mesh );
                  //console.log(this.x+" "+this.y+" "+this.z);
              },
    setMesh: function ( mesh ) {
                 this.mesh = mesh.clone();
                 this.mesh.scale.set( 0.01, 0.01, 0.01 );
                 this.mesh.position.set(this.x, this.y, this.z);
                 this.mesh.speed = 250;
                 this.mesh.duration = this.duration;
                 this.mesh.time = 600 * Math.random();
                 //this.mesh.rotation.y = Math.PI/2;
                 this.mesh.up.set(0, 0, 1);
                 this.mesh.lookAt(new THREE.Vector3(this.x, this.y, this.z));
                 terrain[0].add( this.mesh );
                 //this.regenWay();
                 //console.log(this.x+" "+this.y+" "+this.z);
             },
    updateMorph: function (  ){
                     //console.log(this.file+" "+this.mesh.geometry.morphTargets.length);
                     this.mesh.updateAnimation( 1000 * this.clock.getDelta() );
                     /*var interpolation = this.duration / ( this.mesh.geometry.morphTargets.length - 1 );

        var time = ( new Date().getTime()  + this.offset * 100 ) % this.duration;
        var keyframe = Math.floor( time / interpolation ) + 1;

        //var mesh = this.mesh;

        if ( keyframe != this.currentKeyframe ) {

            this.mesh.morphTargetInfluences[ this.lastKeyframe ] = 0;
            this.mesh.morphTargetInfluences[ this.currentKeyframe ] = 1;
            this.mesh.morphTargetInfluences[ keyframe ] = 0;

            this.lastKeyframe = this.currentKeyframe;
            this.currentKeyframe = keyframe;

        }

        this.mesh.morphTargetInfluences[ keyframe ] = ( time % interpolation ) / interpolation;
        this.mesh.morphTargetInfluences[ this.lastKeyframe ] = 1 - this.mesh.morphTargetInfluences[ keyframe ];

        var newTime = new Date().getTime();
        delta = newTime - this.oldTime;
        this.oldTime = newTime;*/
                 },
    regenWay: function( ){
                  var start=new THREE.Vector3(this.x,this.y,this.z);
                  var lookat=new THREE.Vector3(0,0,0);
                  var prestart=new THREE.Vector3(this.x-1,this.y-1,this.z);
                  if(this.spline){
                      start=this.spline.getPoint(1);
                      prestart=this.spline.getPoint(0.9);
                  }
                  //console.log(start);
                  var randomPoints = [];
                  for ( var i = 0; i < 20; i ++ ) {
                      randomPoints.push(start.clone());
                      lookat=start.clone();
                      lookat.sub(prestart);
                      prestart=start.clone();

                      do {
                          start=prestart.clone();
                          var angle=Math.random()*90-45;
                          var axis = new THREE.Vector3( 0, 0, 1 );
                          var matrix = new THREE.Matrix4().makeRotationAxis( axis, angle* (Math.PI/180) );
                          lookat.setZ(0);
                          //matrix.multiplyVector3( lookat );
                          lookat.applyMatrix4(matrix);
                          lookat.setLength(1);
                          start.add(lookat);
                      }while(start.x<-(heightMapSize/2)+5&&start.x>heightMapSize/2-5&&start.y<-(heightMapSize/2)+5&&start.y>heightMapSize/2-5)
                          //console.log("Now Start: "+start.x+" "+start.y+" "+start.z);

                          //console.log(lookat);
                          //var x=start.x+lookat.x;//Math.random()*4-2;
                          //var y=start.y+lookat.y;//Math.random()*4-2;
                          start.setZ(getTerrainHeigth(start.x,start.y));
                      //start=new THREE.Vector3(x,y,z);
                      //console.log(start);
                  }
                  this.spline = new THREE.SplineCurve3(randomPoints);
              },
    moveTick: function (  ){
                  this.updateMorph();
                  if(!this.spline){
                      this.regenWay();
                  }
                  this.mesh.position = this.spline.getPoint(this.t);
                  this.t+=0.01;
                  if(this.t>=1.0)this.regenWay();
                  this.t=this.t%1.0;
                  var dir=this.spline.getPoint(this.t);
                  this.mesh.lookAt(dir);
              }
}
