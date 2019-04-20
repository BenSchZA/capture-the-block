import Phaser from 'phaser';

export default class Scene extends Phaser.Scene {

  game;
  player;
  cursors;
  scene;

  start_x = 420;
  start_y = 680;
  end_x = 850;
  end_y = 255;

  getPosition(progress) {
    const x_len = this.end_x - this.start_x;
    const y_len = this.end_y - this.start_y;

    const x_prog = this.start_x + x_len*progress;
    const y_prog = this.start_y + y_len*progress;

    return {x: x_prog, y: y_prog};
  }

  preload() {
    this.load.tilemapTiledJSON('map', 'impact-tilemap.json');
    this.load.image('kenney', 'kenney.png');
    this.load.image('player', 'phaser-dude.png');
  }

  create() {
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('kenney');
    const layer = map.createStaticLayer(0, tileset, 0, 0);
 
    // Any tile with the collides property set to true (in Tiled) will be set to collide
    layer.setCollisionByProperty({ collides: true });
 
    // Impact collisions with the world work by using slope IDs. An ID of 0 is non-colliding, an ID
    // of 1 is a solid rectangle, an ID of 2 is a 45 degree upward slope, etc. Check out this visual
    // reference:
    // https://github.com/photonstorm/phaser3-examples/blob/master/public/assets/tilemaps/tiles/slopes.png
 
    // We need to construct a collision map (of slope IDs) in order to register collisions with a
    // tilemap layer. We can do this in one of two ways:
 
    // Method 1. If we assign the slope IDs as tile properties in Tiled's tileset editor, we can
    // load them by passing in the property name, e.g. impact-tilemap.json has a property on every
    // tile called "slope":
    this.impact.world.setCollisionMapFromTilemapLayer(layer, { slopeProperty: 'slope' });
 
    // Method 2. If we don't have slopes defined in Tiled, we can manually map tile index to slope
    // ID using an object:
    // var slopeMap = { 32: 1, 77: 1, 82: 1, 95: 24, 137: 2, 140: 24, 36: 2 };
    // this.impact.world.setCollisionMapFromTilemapLayer(layer, { slopeMap: slopeMap });
 
    // Note: the collision map is static! If you remove/change the colliding tiles, it will not be
    // updated.
 
    this.player = this.impact.add.image(350, 300, 'player');
    this.player.setMaxVelocity(300, 400).setFriction(800, 0);
    this.player.body.accelGround = 1200;
    this.player.body.accelAir = 600;
    this.player.body.jumpSpeed = 300;
 
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
 
    this.cursors = this.input.keyboard.createCursorKeys();
 
    const help = this.add.text(16, 16, 'Arrow keys to move. Press "up" to jump.', {
        fontSize: '18px',
        fill: '#ffffff'
    });
    help.setScrollFactor(0);
  }

  update(time, delta) {
    const accel = this.player.body.standing ? this.player.body.accelGround : this.player.body.accelAir;

    if (this.cursors.left.isDown)
    {
      this.player.setAccelerationX(-accel);
    }
    else if (this.cursors.right.isDown)
    {
      this.player.setAccelerationX(accel);
    }
    else
    {
      this.player.setAccelerationX(0);
    }

    if (this.cursors.up.isDown && this.player.body.standing)
    {
      this.player.setVelocityY(-this.player.body.jumpSpeed);
    }

    const coords = this.getPosition(1.0);

    this.player.x = coords.x;
    this.player.y = coords.y;
  }
}

