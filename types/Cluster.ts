export interface Cluster {
  clusterColor: string;
  clusterTextColor: string;
  clusterFontFamily: string;
  type: string;
  id: number;
  properties: Properties;
  geometry: Geometry;
  onPress: () => void;
}

interface Geometry {
  type: string;
  coordinates: number[];
}

interface Properties {
  cluster: boolean;
  cluster_id: number;
  point_count: number;
  point_count_abbreviated: number;
}

// {
//     "clusterColor": "white",
//     "clusterTextColor": "black",
//     "clusterFontFamily": "Mont_sb",
//     "type": "Feature",
//     "id": 14983,
//     "properties": {
//     "cluster": true,
//         "cluster_id": 14983,
//         "point_count": 2,
//         "point_count_abbreviated": 2
// },
//     "geometry": {
//     "type": "Point",
//         "coordinates": [
//         13.29345703125,
//         52.50504197981826
//     ]
// }
// }
