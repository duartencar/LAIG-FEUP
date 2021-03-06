/**
 * Created by juntas on 15-10-2017.
 */

function myPatch(scene, Udivs, Vdivs, CpLines) //Udivs e Vdivs estao indicados na Leaf
{
  this.scene = scene;

  this.Udivs = Udivs;

  this.Vdivs = Vdivs;

  this.CpLines = CpLines;

  getDegree = function(x)
  {
    return x.length - 1;
  };

  this.Udegree = getDegree(this.CpLines);//the size of the vector is the degree in U + 1

  this.Vdegree = getDegree(this.CpLines[0]);//the number of elements in each CpLine is the degree in V + 1

  var knots1 = this.getKnotsVector(this.Udegree);

  var knots2 = this.getKnotsVector(this.Vdegree);

  var nurbsSurface = new CGFnurbsSurface(this.Udegree, this.Vdegree, knots1, knots2, this.CpLines);

  getSurfacePoint = function(u, v)
  {
    return nurbsSurface.getPoint(u, v);
  };

  CGFnurbsObject.call(this, this.scene, getSurfacePoint, parseInt(this.Udivs), parseInt(this.Vdivs));

};

myPatch.prototype = Object.create(CGFnurbsObject.prototype);

myPatch.prototype.constructor = myPatch;

myPatch.prototype.getKnotsVector = function (degree)
{
  var v = new Array();

  for(var i = 0;  i <= degree; i++)
    v.push(0);

  for(var i = 0; i <= degree; i++)
    v.push(1);

  return v;
};