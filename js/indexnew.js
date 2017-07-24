/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/*******************
Usage example.

******************/
var dsOpts={
  dsID: "slideContainer",  // the element ID that contains all the content
  dsHeigt:440,  // default: 450;
  slidesClass: 'slideDiv',  // get all elements with the className. default: slideDiv.
  dsDelay:3000,  //1000 = 1 second. Default: 3000
 // dsHtml: htm,  // default: innerHTML of the container element.
 
};
divSlider(dsOpts);  

var opt2={
  dsID:"slide2",
  slidesClass: 'slideDiv'
}
 divSlider(opt2);

var opt3={
  dsID:"slide3",
  slidesClass: 'slideDiv'
}
 divSlider(opt3);

var opt4={
  dsID:"slide4",
  slidesClass: 'slideDiv'
}
 divSlider(opt4);

var opt5={
  dsID:"slide5",
  slidesClass: 'slideDiv'
}
 divSlider(opt5);

var opt6={
  dsID:"slide6",
  slidesClass: 'slideDiv'
}
 divSlider(opt6);

/**************************/
function divSlider(dsOpts){   
  
 (function(opts){   
   
  if(!opts){console.log(" Warning!: No Options passed ..."); return;}
  if(!opts.dsID){console.log(" Warning!: No Div ID is passed ..."); return;}
  
	var dsIndex = 0,divs=[],itms=0,spans,playBtn;
	var timeout = opts.dsDelay || 3000,intrvl;
	
	function rotateDiv(ndx){  // main engine :)
	  var i;

	  for (i=0; i < itms; i++ ) {
		var dv = divs[i];
		if ( (dv.id !== "")) {
			if(i != ndx){
				dv.style.opacity=0;

			}else{

				dv.style.opacity=1; 
			}
		} 
	  }

	}


	function stopShow() {
		clearInterval(intrvl);
	}

	function resumeShow(){
	  intrvl = setInterval(showNext, timeout);
	}
	function showNext(){
	  dsIndex++; 
	  if(dsIndex>=itms){
		dsIndex=0;
	  }
	  rotateDiv(dsIndex);
	}

	function showPrev(){
	    
		if(dsIndex <= 0){
			dsIndex=itms;
		}
		// console.log(dsIndex);
		 dsIndex--;
		rotateDiv(dsIndex);
	}
  
setTimeout(function(){  //let the DOM get loaded...

	/**************************/
	var sc=document.getElementById(opts.dsID);

	if(opts.dsHtml){
	   sc.innerHTML = opts.dsHtml;  //  || ;
	}

	var wdth = opts.dsWidth || 800;
	var hght = opts.dsHeigt || 450;
	var slidesClass = opts.slidesClass || 'slideDiv'; // get all elements with the className
  
	//sc.style.width = wdth+'px';
	sc.style.height = hght+'px';
	
	var wh=getWH(sc);
	var navPos = (wh.H/2)-15;  // navigation button position 
	var playBtnLeft=(wh.W/2)-20;
	
	
	  playBtn = document.createElement('button');
	   //playBtn.className="playbtn";
  // CSS here to make it self contained and simple to use
	  playBtn.style.left=playBtnLeft+"px";
	  playBtn.style.top=navPos+'px';
		playBtn.style.position='absolute';
		playBtn.style.fontSize='30px';
		playBtn.style.color='black';
		playBtn.style.textAlign='center';
		playBtn.style.height='50px';
		playBtn.style.backgroundColor='#cccccc';
	  playBtn.style.opacity=0;
	  playBtn.innerHTML="Play";
	  playBtn.onclick = function(){ intrvl = setInterval(showNext, timeout); playBtn.style.opacity=0;};
	  sc.appendChild(playBtn);

	var navR = document.createElement('span');
	 //navR.className="slideNavR";
		navR.style.position='absolute';
		navR.style.fontSize='40px';
		navR.style.color='black';
		navR.style.textAlign='center';
		navR.style.height='50px';
		navR.style.backgroundColor='#cccccc';
	    navR.style.opacity=.6;
	 navR.style.top=navPos+'px';
     navR.style.right="3px";
	 navR.innerHTML=" > ";
	 navR.onclick = function(){ stopShow(); showNext(); playBtn.style.opacity=.6;};
	  sc.appendChild(navR);	

	var navL = document.createElement('span');
	// navL.className="slideNavR";
		navL.style.position='absolute';
		navL.style.fontSize='40px';
		navL.style.color='black';
		navL.style.textAlign='center';
		navL.style.height='50px';
		navL.style.backgroundColor='#cccccc';
	    navL.style.opacity=.6;
	
	 navL.style.top=navPos+'px';
     navL.style.left="3px";
	 navL.innerHTML=" < ";
	 navL.onclick = function(){ stopShow(); showPrev(); playBtn.style.opacity=.6;};
	  sc.appendChild(navL);	
	  

	// get contnets of all Elements with className == slidesClass.
	divs = sc.getElementsByClassName(slidesClass);
	  itms =divs.length;

	function autorotate() {
		showNext();
	}

	intrvl = setInterval(showNext, timeout);

	function getWH(el){
	  var w,h;
	   if(!el){
		 w = window.innerWidth
		|| document.documentElement.clientWidth
		|| document.body.clientWidth;

		 h = window.innerHeight
		|| document.documentElement.clientHeight
		|| document.body.clientHeight;
	   }else{
	     w=el.clientWidth;
		 h=el.clientHeight;
	   }
      return {"H":h,"W":w}; 		
	}

},60); //for DOM to load
 
 })(dsOpts);   
}  // divSlider end