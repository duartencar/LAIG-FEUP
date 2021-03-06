/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
**/

function MyGraphLeaf(graph, xmlelem)
{
  this.graph = graph;

  this.xmlelem = xmlelem;

  this.scene = this.graph.scene;

  this.LeafType = xmlelem.getAttribute("type");

  this.LeafArgs = this.setArgs(xmlelem);

  //Only have elements with patch Leafs
  this.patchLines = [];

  if(this.LeafType != "patch") {
    this.leaf = this.getLeaf();
  }
}

MyGraphLeaf.prototype.noMorePatchLines = function () {
  this.leaf = this.getLeaf();
};

/**
 * prints the Leaf type
 **/
MyGraphLeaf.prototype.printLeafType = function ()
{
  console.log(this.LeafType);
};

/**
 * prints the Leaf args
 **/
MyGraphLeaf.prototype.printLeafArgs = function ()
{
  console.log(this.LeafArgs);
};

/**
 * prints the Leaf xml element
 **/
MyGraphLeaf.prototype.printxmlelem = function ()
{
  console.log(this.xmlelem);
};

/**
 * adds a group of Cpoints that form a CpLine
 **/
MyGraphLeaf.prototype.addPatchLine = function (x)
{
  this.patchLines.push(x);
};

MyGraphLeaf.prototype.setArgs = function (xmlelem)
{
  let unChecked = xmlelem.getAttribute("args").split(" ");

  let checked = [];

  for(let i = 0, l = unChecked.length; i < l; i++) {
    if (unChecked[i] != "") {
      checked.push(unChecked[i]);
    }
  }

  return checked;
};

/**
 * creates an CGF object according to the Leaf type and returns it
 **/
MyGraphLeaf.prototype.getLeaf = function ()
{
  let Leaf = null;

  switch(this.LeafType)
  {
    case "cylinder":
      this.LeafArgs.length != 7 ? console.log("Worng number of args for cylinder ( must be 7)") : Leaf = new myCylinder(this.scene, parseFloat(this.LeafArgs[0]), parseFloat(this.LeafArgs[1]), parseFloat(this.LeafArgs[2]), parseFloat(this.LeafArgs[3]), parseFloat(this.LeafArgs[4]), this.LeafArgs[5], this.LeafArgs[6]);
          
      break;
    case "rectangle":
      this.LeafArgs.length != 4 ? console.log("Worng number of args for rectangle ( must be 4)") : Leaf = new myRectangle(this.scene, parseFloat(this.LeafArgs[0]), parseFloat(this.LeafArgs[1]), parseFloat(this.LeafArgs[2]), parseFloat(this.LeafArgs[3]));
        
      break;
    case "triangle":
      this.LeafArgs.length != 9 ? console.log("Worng number of args for triangle ( must be 6)") : Leaf = new myTriangle(this.scene, this.LeafArgs[0], this.LeafArgs[1], this.LeafArgs[2], this.LeafArgs[3], this.LeafArgs[4], this.LeafArgs[5], this.LeafArgs[6], this.LeafArgs[7], this.LeafArgs[8]);

      break;
    case "sphere":
      this.LeafArgs.length != 3 ? console.log("Worng number of args for sphere ( must be 3)") : Leaf = new mySphere(this.scene, parseFloat(this.LeafArgs[0]), parseFloat(this.LeafArgs[1]), parseFloat(this.LeafArgs[2]));
      
      break;
    case "patch":
      this.LeafArgs.length != 2 ? console.log("Worng number of args for patch ( must be 2)") : Leaf = new myPatch(this.scene, this.LeafArgs[0], this.LeafArgs[1], this.patchLines);
      
      break;
    default:
      console.log(this.LeafType + " is not ready yet!");
  }

  return Leaf;
};

/**
 * Draws a Leaf
 * toDraw - object to draw
 * Matrix - the transformation matrix that will be 'applied'
 * Texture - the texture that will be apllied to the object
 * Material- the material that will be applied to the object
 **/
MyGraphLeaf.prototype.draw = function(Matrix, Texture, Material)
{
  let appearance = null;

  scene.pushMatrix();

    //If there is no meterial the default one will be applied
    Material == "null" ? appearance = this.scene.graph.materials["defaultMaterial"] : appearance = this.scene.graph.materials[Material];

    //It will only a aplly a texture if there is a material
    if(Texture != "clear" && Material != "null" && Texture != "null")
    {
      //applies the texture
      appearance.setTexture(this.scene.graph.textures[Texture][0]);

      //if the object is a rectangle or a triangle it will check for the amplif_factor attribute
      if((this.leaf instanceof myRectangle || this.leaf instanceof myTriangle) && (this.scene.graph.textures[Texture][1] != 1.0 || this.scene.graph.textures[Texture][2] != 1.0))
        this.leaf.ampText(this.scene.graph.textures[Texture][1], this.scene.graph.textures[Texture][2]);
    }

    //applies the appearance
    appearance.apply();

    //applies the transformation matrix
    this.scene.multMatrix(Matrix);

    //displays object
    this.leaf.display();

    //reset material texture
    appearance.setTexture(null);

  scene.popMatrix();
};
