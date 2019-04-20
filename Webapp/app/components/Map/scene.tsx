import Phaser from 'phaser';

enum Side {
  LEFT,
  RIGHT
}

interface Player {
  side: Side,
  progress: Number,
  sprite: any,
}

export default class Scene extends Phaser.Scene {

  game;
  cursors;
  scene;
  map;

  start_x = 420;
  start_y = 680;
  end_x = 850;
  end_y = 255;

  start_x2 = 1335;
  start_y2 = 680-45;
  end_x2 = 890;
  end_y2 = 255-45;

  currentBlock = 0;

  getPositionLeft(progress) {
    const x_len = this.end_x - this.start_x;
    const y_len = this.end_y - this.start_y;

    const x_prog = this.start_x + x_len*progress;
    const y_prog = this.start_y + y_len*progress;

    return {x: x_prog, y: y_prog};
  }

  getPositionRight(progress) {
    const x_len = this.start_x2 - this.end_x2;
    const y_len = this.end_y2 - this.start_y2;

    const x_prog = this.start_x2 - x_len*progress;
    const y_prog = this.start_y2 + y_len*progress;

    return {x: x_prog, y: y_prog};
  }

  createPlayer(side) {
    let player;

    if(side === Side.LEFT) {
      player = this.createContext.physics.add.image(this.start_x, this.start_y, Side.LEFT.toString());
      this.playerLeft = player;
    } else {
      player = this.createContext.physics.add.image(this.start_x2, this.start_y2, Side.RIGHT.toString());
      this.playerRight = player;
    }

    // if(who === PlayerType.ME) {
    //   this.createContext.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    //   this.createContext.cameras.main.startFollow(player);
    // }
    
    player.setMaxVelocity(300, 400).setFriction(800, 0);
    player.body.accelGround = 1200;
    player.body.accelAir = 600;
    player.body.jumpSpeed = 300;

    return player;
  }

  movePlayerLeft(player, progress) {
    const coords = this.getPositionLeft(progress);

    // this.physics.moveTo(player, coords.x, coords.y);
    player.x = coords.x;
    player.y = coords.y;
  }

  movePlayerRight(player, progress) {
    const coords = this.getPositionRight(progress);

    // this.physics.moveTo(player, coords.x, coords.y);
    player.x = coords.x;
    player.y = coords.y;
  }

  preload() {
    this.load.tilemapTiledJSON('map', 'impact-tilemap.json');
    this.load.image('kenney', 'kenney.png');
    this.load.image(Side.LEFT.toString(), 'sonic.png');
    this.load.image(Side.RIGHT.toString(), 'rick.png');
  }

  newPlayer;
  createContext;

  create() {
    this.createContext = this;
    this.createPlayer.bind(this);
    this.createPlayer.bind(this);

    this.map = this.make.tilemap({ key: 'map' });
    const tileset = this.map.addTilesetImage('kenney');
    const layer = this.map.createStaticLayer(0, tileset, 0, 0);
 
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
    // @ts-ignore
    // this.physics.world.setCollisionMapFromTilemapLayer(layer, { slopeProperty: 'slope' });

    // Method 2. If we don't have slopes defined in Tiled, we can manually map tile index to slope
    // ID using an object:
    // var slopeMap = { 32: 1, 77: 1, 82: 1, 95: 24, 137: 2, 140: 24, 36: 2 };
    // this.impact.world.setCollisionMapFromTilemapLayer(layer, { slopeMap: slopeMap });
 
    // Note: the collision map is static! If you remove/change the colliding tiles, it will not be
    // updated.
 
    const help = this.add.text(16, 16, 'Buy and sell up and down the bonding curve to move,\nand try to caputure the flag first!', {
        fontSize: '24px',
        fill: '#ffffff'
    });
    help.setScrollFactor(0);
  }

  lastUpdateTime = 0;

  playerLeft = {
    side: Side.LEFT,
    progress: 0,
    sprite: null,
  } as Player;
  playerRight = {
    side: Side.RIGHT,
    progress: 0,
    sprite: null,
  } as Player;

  setProgress(side, progress) {
    if(side === Side.LEFT) {
      this.playerLeft.progress = progress;
    } else {
      this.playerRight.progress = progress;
    }
  }

  update(time, delta) {
    if(time - this.lastUpdateTime > 500) {
      if(!this.playerLeft.sprite) {
        this.playerLeft.sprite = this.createPlayer.bind(this.createContext)(Side.LEFT);
      }
      if(!this.playerRight.sprite) {
        this.playerRight.sprite = this.createPlayer.bind(this.createContext)(Side.RIGHT);
      }

      if(this.playerLeft.sprite && this.playerRight.sprite) {
        this.movePlayerLeft(this.playerLeft.sprite, this.playerLeft.progress);
        this.movePlayerLeft(this.playerRight.sprite, this.playerRight.progress);
      }

      this.lastUpdateTime = time;
    }
  }
}

