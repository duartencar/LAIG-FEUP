 /**
 * MyInterface class, creating a GUI interface.
 * @constructor
 */
function MyInterface()
{
  //call CGFinterface constructor
  CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);

MyInterface.prototype.constructor = MyInterface;

/**
 * Initializes the interface.
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application)
{
  // call CGFinterface init
  CGFinterface.prototype.init.call(this, application);

  // init GUI. For more information on the methods, check:
  //  http://workshop.chromeexperiments.com/examples/gui

  this.gui = new dat.GUI();

  // add a group of controls (and open/expand by defult)

  return true;
};

MyInterface.prototype.addCamerasGroup = function(scene)
{
  var group = this.gui.addFolder("Cameras");

  scene.activeCameraIndex = scene.camerasID[0];

  group.open();

  this.gui.add(scene, 'activeCameraIndex', scene.camerasID).onChange(function()
  {
  //scene.interface.setActiveCamera(scene.cameras[scene.activeCameraIndex]);

  scene.cameraTransition = new CameraTransition(scene.cloneCamera(scene.camera), scene.cloneCamera(scene.cameras[scene.activeCameraIndex]), scene.cameraTransitionsSpeed, 'LINEAR', 0);
  });
}

/**
 * Adds a folder containing the IDs of the lights passed as parameter.
 */
MyInterface.prototype.addLightsGroup = function(lights)
{
  var group = this.gui.addFolder("Lights");

  group.open();

  // add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
  // e.g. this.option1=true; this.option2=false;

  for (var key in lights)
  {
    if (lights.hasOwnProperty(key))
    {
      this.scene.lightValues[key] = lights[key][0];

      group.add(this.scene.lightValues, key);
    }
  }
}

MyInterface.prototype.gameControlsGroup = function(scene)
{
  var group = this.gui.addFolder("Game Controls");

  this.gui.add(scene, 'rollDice').name('Roll Dice');

  this.gui.add(scene, 'undo').name('Undo');

  this.gui.add(scene, 'resetGame').name('Reset Game');
}

MyInterface.prototype.gameSettings = function(scene)
{
  var group = this.gui.addFolder("Settings");

  this.gui.add(this.scene, 'pieceAnimationSpeed', 2, 15).name('Piece Speed').onChange(function(x)
	{
		scene.pieceAnimationSpeed = x;
	});

  this.gui.add(this.scene, 'lookAtDicesTime', 0.5, 4).name('Dices Time').onChange(function(x)
	{
		scene.lookAtDicesTime = x;
	});

  this.gui.add(this.scene, 'cameraTransitionsSpeed', 0.01, 4).name('Camera Speed').onChange(function(x)
	{
		scene.cameraTransitionsSpeed = x;
	});
}
