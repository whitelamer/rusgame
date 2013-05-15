Charater = function (model, x, y, z) {
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
Charater.prototype = {
    constructor: Charater,
    setMesh: function ( mesh ) {
                 this.mesh = mesh.clone();
                 //console.log(this.mesh.material.materials.length);
                 for(var i=0,n=this.mesh.material.materials.length;i<n;i++){
                     var m = this.mesh.material.materials[i];
                     m.skinning = true;
                     //m.morphTargets = true;
                     //m.specular.setHSV( 0, 0, 0.1 );
                     //m.color.setHSV( 0.6, 0, 0.6 );
                     //m.ambient.copy( m.color );
                     m.wrapAround = true;
                 }
                 //this.mesh.material.materials[1].skinning = true;
                 this.mesh.scale.set( .1, .1, .1 );
                 this.mesh.position.set(this.x, this.y, this.z);
                 this.mesh.castShadow = true;
                 //this.mesh.speed = 250;
                 //this.mesh.duration = this.duration;
                 this.mesh.time = 600 * Math.random();
                 //this.mesh.rotation.y = Math.PI/2;
                 this.mesh.up.set(0, 0, 1);
                 this.mesh.lookAt(new THREE.Vector3(this.x, this.y, this.z));
                 terrain[0].add( this.mesh );
                 console.log(this.mesh);

                 var animation = new THREE.Animation( this.mesh, "walk" );
                 console.log(animation);
                 animation.play();

                 //animations.push( animation );
                 //this.regenWay();
                 //console.log(this.x+" "+this.y+" "+this.z);
             },
    updateMorph: function (  ){
                     //this.mesh.updateAnimation( 1000 * this.clock.getDelta() );
                 },
    regenWay: function( ){
                  var start=new THREE.Vector3(this.x,this.y,this.z);
                  var lookat=new THREE.Vector3(0,0,0);
                  var prestart=new THREE.Vector3(this.x+1,this.y+1,this.z);
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
                          start.setZ(getTerrainHeigth(start.x,start.y));
                  }
                  this.spline = new THREE.SplineCurve3(randomPoints);
              },
    moveTick: function (  ){
                  //this.updateMorph();
                  if(!this.spline){
                      this.regenWay();
                  }
                  this.mesh.position = this.spline.getPoint(this.t);
                  //this.t=0.1;
                  this.t+=0.001;
                  if(this.t>=1.0)this.regenWay();
                  this.t=this.t%1.0;
                  var dir=this.spline.getPoint(this.t);
                  //dir.setZ(this.mesh.position.z);
                  this.mesh.lookAt(dir);
              }
}
