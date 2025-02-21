class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfGeneration = 0;
    let currVamp = this;

    // climb "up" the tree (using iteration), counting nodes, until no boss is found
    while (currVamp.creator) {
      currVamp = currVamp.creator;
      numberOfGeneration++;
    }

    return numberOfGeneration;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal <= vampire.numberOfVampiresFromOriginal;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let currVamp = {};

    if (this.name === vampire.name) {
      //self case
      currVamp = this;
    } else if (!this.creator || !vampire.creator) {
      //root case (null || null)
      currVamp = this.getRoot(this);
    } else if (this.creator.name === vampire.creator.name) {
      //same creator
      currVamp = this.creator;
    } else {
      //recursion
      if (this.isMoreSeniorThan(vampire)) {
        currVamp = this.closestCommonAncestor(vampire.creator);
      } else if (vampire.isMoreSeniorThan(this)) {
        currVamp = this.creator.closestCommonAncestor(vampire);
        //different level
      } else {
        currVamp = this.creator.closestCommonAncestor(vampire.creator);
        //same level but different branch
      }
    }
    return currVamp;
  }

  getRoot(vampire) {
    let currVamp = vampire;
    // climb "up" the tree (using iteration), counting nodes, until no boss is found
    if (vampire.creator) {
      currVamp = this.getRoot(vampire.creator);
    }

    return currVamp;
  }
 
  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {

  }

  // Returns the total number of vampires that exist
  get totalDescendents() {

  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {

  }
}

module.exports = Vampire;

