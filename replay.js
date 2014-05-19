var canvas;
var ctx;
var img;
var img2;
var pat;
var pat2;
var paperColor = "rgb(253, 253, 240)";
var capture;

var curveFitting = 'none';
var tension;
var sample;
var thickness;
var darkness;
var blur;
var shadowDarkness;
var pressure;

var redrawButton;

var noneInput;
var splineInput;
var bezier2Input;
var bezier3Input;

var tensionInput;
var sampleInput;
var thicknessInput;
var darknessInput;
var blurInput;
var shadowDarknessInput;
var pressureInput;

var tensionReadout;
var sampleReadout;
var thicknessReadout;
var darknessReadout;
var blurReadout;
var shadowDarknessReadout;
var pressureReadout;

// *********************************************************************
// window.onload
//   Sets the canvas context, loads the JSON capture data and binds
//   events to the GUI controllers in the control panel.
//
window.onload = function(){
  canvas = document.getElementById('canvas');
  img = document.getElementById("img");
  img2 = document.getElementById("img2");
  ctx = canvas.getContext('2d');
  pat = ctx.createPattern(img,"repeat");
  pat2 = ctx.createPattern(img2, "repeat");
  ctx.strokeStyle = pat;

  // load capture file points
  capture = JSON.parse(jsonstr);

  redrawButton = document.getElementById('redraw-button');
  redrawButton.onclick = function(e) {
    redraw();
  }

  // tension input
  tensionInput = document.getElementById('tension-input');
  tensionReadout = document.getElementById('tension-readout');
  tension = tensionInput.value;
  tensionReadout.innerHTML = tension;
  tensionInput.oninput = function(e) {
    tension = tensionInput.value;
    tensionReadout.innerHTML = tension;
    //redraw();
  }

  // sample input
  sampleInput = document.getElementById('sample-input');
  sampleReadout = document.getElementById('sample-readout');
  sample = sampleInput.value;
  sampleReadout.innerHTML = sample;
  sampleInput.oninput = function(e) {
    sample = sampleInput.value;
    sampleReadout.innerHTML = sample;
    //redraw();
  }

  // thickness input
  thicknessInput = document.getElementById('thickness-input');
  thicknessReadout = document.getElementById('thickness-readout');
  thickness = thicknessInput.value;
  thicknessReadout.innerHTML = thickness;
  thicknessInput.oninput = function(e) {
    thickness = thicknessInput.value;
    thicknessReadout.innerHTML = thickness;
    //redraw();
  }

  // darkness input
  darknessInput = document.getElementById('darkness-input');
  darknessReadout = document.getElementById('darkness-readout');
  darkness = darknessInput.value;
  darknessReadout.innerHTML = darkness;
  darknessInput.oninput = function(e) {
    darkness = darknessInput.value;
    darknessReadout.innerHTML = darkness;
    //redraw();
  }

  // pressure input
  pressureInput = document.getElementById('pressure-input');
  pressureReadout = document.getElementById('pressure-readout');
  pressure = pressureInput.value;
  pressureReadout.innerHTML = pressure;
  pressureInput.oninput = function(e) {
    pressure = pressureInput.value;
    pressureReadout.innerHTML = pressure;
    //redraw();
  }

  // curve fitting input - none
  noneInput = document.getElementById('none-input');
  noneInput.onchange = function(e) {
    if(noneInput.checked) {
      curveFitting = 'none';
    }
    redraw();
  }

  // curve fitting input - spline
  splineInput = document.getElementById('spline-input');
  splineInput.onchange = function(e) {
    if(splineInput.checked) {
      curveFitting = 'spline';
    }
    redraw();
  }

  // curve fitting input - bezier 2
  bezier2Input = document.getElementById('bezier2-input');
  bezier2Input.onchange = function(e) {
    if(bezier2Input.checked) {
      curveFitting = 'bezier2';
    }
    redraw();
  }

  //curve fitting input - bezier 3
  bezier3Input = document.getElementById('bezier3-input');
  bezier3Input.onchange = function(e) {
    if(bezier3Input.checked) {
      curveFitting = 'bezier3';
    }
    redraw();
  }

  // draw curves with default control values
  redraw();
}

// *********************************************************************
// pressureSensitivity
//   Remap pressure value based on sensitivity input between 0 and 1.
//
function mapPressure(p) {
  var result = 1 - pressure*(1 - p);
  return result;
}

// *********************************************************************
// clearCanvas
//   Clears the canvas and fills it with the paper color.
//
function clearCanvas() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = paperColor;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

// *********************************************************************
// redraw
//   Clears the canvas ....
//
//
function redraw() {
  clearCanvas();

  if(curveFitting === 'none') {
    redrawNone();
  }

  if(curveFitting === 'spline') {
    redrawSpline();
  }
}

function getMinPt(x1, y1, x2, y2, x3, y3, x4, y4) {
  var minx = Math.min(x1, x2, x3, x4) + Math.random()*50;
  var miny = Math.min(y1, y2, y3, y4) + Math.random()*50;

  return {x: minx, y: miny};
}