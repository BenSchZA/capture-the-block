import React, { Fragment } from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import * as Phaser from 'phaser';

const styles = ({ palette, breakpoints, spacing, zIndex, mixins }: Theme) => createStyles({

});

interface Props extends WithStyles<typeof styles> {

}

const config = {
  type: Phaser.CANVAS,
  width: 800,
  height: 600,
  backgroundColor: '#2d2d2d',
  parent: 'phaser-div',
  pixelArt: true,
  physics: {
      default: 'impact',
      impact: { gravity: 200 }
  },
  scene: {
      preload: this.preload,
      create: this.create,
      update: this.update,
  }
};

let game;
let player;
let cursors;

const start_x = 420;
const start_y = 680;
const end_x = 850;
const end_y = 255;

class Map extends React.Component<Props> {
  public state = {};

  getPosition(progress) {
    const x_len = end_x - start_x;
    const y_len = end_y - start_y;

    const x_prog = start_x + x_len*progress;
    const y_prog = start_y + y_len*progress;

    return {x: x_prog, y: y_prog};
  }

  preload() {
    game.load.tilemapTiledJSON('map', 'impact-tilemap.json');
    game.load.image('kenney', 'kenney.png');
    game.load.image('player', 'phaser-dude.png');
  }

  create() {
    const map = game.make.tilemap({ key: 'map' });
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
    game.impact.world.setCollisionMapFromTilemapLayer(layer, { slopeProperty: 'slope' });
 
    // Method 2. If we don't have slopes defined in Tiled, we can manually map tile index to slope
    // ID using an object:
    // var slopeMap = { 32: 1, 77: 1, 82: 1, 95: 24, 137: 2, 140: 24, 36: 2 };
    // this.impact.world.setCollisionMapFromTilemapLayer(layer, { slopeMap: slopeMap });
 
    // Note: the collision map is static! If you remove/change the colliding tiles, it will not be
    // updated.
 
    player = game.impact.add.image(350, 300, 'player');
    player.setMaxVelocity(300, 400).setFriction(800, 0);
    player.body.accelGround = 1200;
    player.body.accelAir = 600;
    player.body.jumpSpeed = 300;
 
    game.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    game.cameras.main.startFollow(player);
 
    cursors = game.input.keyboard.createCursorKeys();
 
    const help = game.add.text(16, 16, 'Arrow keys to move. Press "up" to jump.', {
        fontSize: '18px',
        fill: '#ffffff'
    });
    help.setScrollFactor(0);
  }

  update(time, delta) {
    const accel = player.body.standing ? player.body.accelGround : player.body.accelAir;

    if (cursors.left.isDown)
    {
        player.setAccelerationX(-accel);
    }
    else if (cursors.right.isDown)
    {
        player.setAccelerationX(accel);
    }
    else
    {
        player.setAccelerationX(0);
    }

    if (cursors.up.isDown && player.body.standing)
    {
        player.setVelocityY(-player.body.jumpSpeed);
    }

    const coords = this.getPosition(1.0);

    player.x = coords.x;
    player.y = coords.y;
  }

  constructor(props) {
    super(props);
    this.populatePhaserMap.bind(this);
  }

  populatePhaserMap() {
    game = new Phaser.Game(config);
  }

  componentDidMount() {
    this.populatePhaserMap();
  }

  shouldComponentUpdate() {
    return false;
  }

  public render() {
    const {} = this.props;
    return (
      <Fragment>
        <div id="phaser-div"></div>
      </Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Map);