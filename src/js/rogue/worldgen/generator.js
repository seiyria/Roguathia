
export default class Generator {
  static generate() {}

  static placeTile(map, type, x, y, z) {
    map[x][y] = new type();
    map[x][y].x = x;
    map[x][y].y = y;
    map[x][y].z = z;
    return map[x][y];
  };

  static placeStairs() {}
}