function loadConstructions(){
    var materials = [];
    var tmap1 = THREE.ImageUtils.loadTexture('images/plants/wood1.jpg');
    tmap1.wrapS = tmap1.wrapT = THREE.RepeatWrapping;
    tmap1.repeat.set(1, 6);
    var material1 = new THREE.MeshPhongMaterial({ map: tmap1});
    materials.push(material1);

    var tmap2 = THREE.ImageUtils.loadTexture('images/textures/straw-texture.jpg');
    tmap2.wrapS = tmap2.wrapT = THREE.RepeatWrapping;
    tmap2.repeat.set(6, 1);
    var material2 = new THREE.MeshPhongMaterial({ map: tmap2});
    materials.push(material2);

    House=new THREE.Mesh(new THREE.Geometry(),materials);
    House.land=getTerrainHeigth(0,0);
    House.height=6;
    House.length=5;
    House.width=5;
    House.havebar=0;
    House.constbar=0;
    House.itime=0;
    House.door=null;
    House.window=new Array();
    House.rotation.set(0,0,.5);
    terrain[0].add(House);
    buildHouse(House);
}
function buildHouse(house){
    if(house.havebar<=house.constbar)return;
    var lsteps=0;
    if(house.constbar>=4&&house.door===null){
        house.door=Objects[20].clone();
        house.door.position.set(0,-(house.length/2-0.5),house.land+0.2);
        house.door.scale.set( .1, .1, .1 );
        //house.door.rotation.set(1.57,0,0);
        house.add(house.door);
    }
    if(house.constbar>=14&&house.window.length===0){
        var win=Objects[21].clone();

        winr=Objects[21].clone();
        win.rotation.set(0,0,3.14);
        win.position.set(0,(house.length/2-0.5),house.land+0.2);
        win.scale.set( .1, .1, .1 );
        house.window.push(win);
        //house.door.rotation.set(1.57,0,0);
        house.add(win);

    }
    for (var i = 0; i < house.height; i++) {
        lsteps++;
        if(lsteps>house.constbar){
            var bar=new THREE.Mesh(new THREE.CylinderGeometry(.2,.2,house.length,6),house.material[0]);
            bar.rotation.set(0,Math.random()*1.57,0);
            bar.position.set(house.width/2-0.5,0,house.land+i*0.4);
            house.add(bar);
            house.constbar++;
            if(house.havebar<=house.constbar)return;
        }
        lsteps++;
        if(lsteps>house.constbar){
            bar=new THREE.Mesh(new THREE.CylinderGeometry(.2,.2,house.length,6),house.material[0]);
            bar.rotation.set(0,Math.random()*1.57,0);
            bar.position.set(-(house.width/2-0.5),0,house.land+i*0.4);
            house.add(bar);
            house.constbar++;
            if(house.havebar<=house.constbar)return;
        }
        lsteps++;
        if(lsteps>house.constbar){
            bar=new THREE.Mesh(new THREE.CylinderGeometry(.2,.2,house.width,6),house.material[0]);
            bar.rotation.set(0,Math.random()*1.57,0);
            bar.position.set(0,-(house.length/2-0.5),house.land+i*0.4+0.2);
            bar.rotation.set(Math.random()*1.57,0,1.57);
            house.add(bar);
            house.constbar++;
            if(house.havebar<=house.constbar)return;
        }
        lsteps++;
        if(lsteps>house.constbar){
            bar=new THREE.Mesh(new THREE.CylinderGeometry(.2,.2,house.width,6),house.material[0]);
            bar.rotation.set(0,Math.random()*1.57,0);
            bar.position.set(0,house.length/2-0.5,house.land+i*0.4+0.2);
            bar.rotation.set(Math.random()*1.57,0,1.57);
            house.add(bar);
            house.constbar++;
            if(house.havebar<=house.constbar)return;
        }
    }



    for (var i = 0; i < house.height-1; i++) {
        lsteps++;
        if(lsteps>house.constbar){
            bar=new THREE.Mesh(new THREE.CylinderGeometry(.15,.15,house.length*1.1,5),house.material[0]);
            bar.rotation.set(0,Math.random()*1.57,0);
            bar.position.set(-(house.width/2-0.5)+(i)*(house.width/house.height/2),0,house.land+i*0.4+house.height*0.4);
            house.add(bar);
            house.constbar++;
            if(house.havebar<=house.constbar)return;
        }
        lsteps++;
        if(lsteps>house.constbar){
            bar=new THREE.Mesh(new THREE.CylinderGeometry(.15,.15,house.length*1.1,5),house.material[0]);
            bar.rotation.set(0,Math.random()*1.57,0);
            bar.position.set((house.width/2-0.5)-(i)*(house.width/house.height/2),0,house.land+i*0.4+house.height*0.4);
            house.add(bar);
            house.constbar++;
            if(house.havebar<=house.constbar)return;
        }
        lsteps++;
        if(lsteps>house.constbar){
            bar=new THREE.Mesh(new THREE.CylinderGeometry(.2,.2,house.width-(i+1)*(house.width/house.height),6),house.material[0]);
            //bar.material.map.repeat.set(1, width-(i)*(width/height));
            bar.rotation.set(0,Math.random()*1.57,0);
            bar.position.set(0,-(house.length/2-0.5),house.land+i*0.4+0.2+house.height*0.4);
            bar.rotation.set(0,0,1.57);
            house.add(bar);
            house.constbar++;
            if(house.havebar<=house.constbar)return;
        }
        lsteps++;
        if(lsteps>house.constbar){
            bar=new THREE.Mesh(new THREE.CylinderGeometry(.2,.2,house.width-(i+1)*(house.width/house.height),6),house.material[0]);
            bar.rotation.set(0,Math.random()*1.57,0);
            bar.position.set(0,house.length/2-0.5,house.land+i*0.4+0.2+house.height*0.4);
            bar.rotation.set(0,0,1.57);
            house.add(bar);
            house.constbar++;
            if(house.havebar<=house.constbar)return;
        }
    }
    lsteps++;
    if(lsteps>house.constbar){
        bar=new THREE.Mesh(new THREE.CylinderGeometry(.3,.3,house.length*1.1,4),house.material[0]);
        bar.position.set(0,0,house.land+(house.height-0)*0.4*2-0.4);
        house.add(bar);
        house.constbar++;
        if(house.havebar<=house.constbar)return;
    }
    /*for (var i = 0; i < house.length/2; i++) {
        for (var j = 0; j < house.width/2; j++) {
            lsteps++;
            if(lsteps>house.constbar){
                bar=new THREE.Mesh(new THREE.CylinderGeometry(1,1,2,8),house.material[1]);
                //bar=new THREE.Mesh(new THREE.CubeGeometry(2.5,2,.35),house.material[1]);
                bar.rotation.set(0,-0.6,1.57);
                bar.scale.set(1.1,1,.25);
                //bar.rotation.set(0,-0.75,0);
                bar.position.set(-0.85,(house.length/2-0.6)-2.2*i,house.land+house.height*0.4+(house.height*0.4)/4*j-0.22);
                house.add(bar);
                house.constbar++;
                if(house.havebar<=house.constbar)return;
            }
        }
    }*/
    /*for (var i = 0; i < house.length/2; i++) {
        lsteps++;
        if(lsteps>house.constbar){
            bar=new THREE.Mesh(new THREE.CylinderGeometry(1,1,2,8),house.material[1]);
            //bar=new THREE.Mesh(new THREE.CubeGeometry(2.5,2,.35),house.material[1]);
            bar.rotation.set(0,-0.6,1.57);
            bar.scale.set(1.1,1,.25);
            //bar.rotation.set(0,-0.75,0);
            bar.position.set(-0.85,(house.length/2-0.6)-2.2*i,house.land+house.height*0.4+(house.height*0.4)/4*3-0.42);
            house.add(bar);
            house.constbar++;
            if(house.havebar<=house.constbar)return;
        }
    }
    for (var i = 0; i < house.length/2; i++) {
        lsteps++;
        if(lsteps>house.constbar){
            bar=new THREE.Mesh(new THREE.CylinderGeometry(1,1,2,8),house.material[1]);
            //bar=new THREE.Mesh(new THREE.CubeGeometry(2.5,2,.35),house.material[1]);
            bar.rotation.set(3.14,-0.6,1.57);
            bar.scale.set(1.1,1,.25);
            //bar.rotation.set(0,-0.75,0);
            bar.position.set(2,(house.length/2-0.6)-2.2*i,house.land+house.height*0.4+(house.height*0.4)/4-0.22);
            house.add(bar);
            house.constbar++;
            if(house.havebar<=house.constbar)return;
        }
    }
    for (var i = 0; i < house.length/2; i++) {
        lsteps++;
        if(lsteps>house.constbar){
            bar=new THREE.Mesh(new THREE.CylinderGeometry(1,1,2,8),house.material[1]);
            //bar=new THREE.Mesh(new THREE.CubeGeometry(2.5,2,.35),house.material[1]);
            bar.rotation.set(3.14,-0.6,1.57);
            bar.scale.set(1.1,1,.25);
            //bar.rotation.set(0,-0.75,0);
            bar.position.set(0.85,(house.length/2-0.6)-2.2*i,house.land+house.height*0.4+(house.height*0.4)/4*3-0.42);
            house.add(bar);
            house.constbar++;
            if(house.havebar<=house.constbar)return;
        }
    }*/
}
