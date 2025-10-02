export type LocalStorageWordleData = {
  curRow: number;
  gameOver: number;
  invalids: Array<string>;
  normSolution: string;
  solution: string;
  tries: Array<Array<string>>;
  won?: number;
};
