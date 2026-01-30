import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import { Object3DNode, MaterialNode } from '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: {
        points?: THREE.Vector3[] | Float32Array | number[];
      } & import('@react-three/fiber').Object3DNode<MeshLineGeometry, typeof MeshLineGeometry>;

      meshLineMaterial: {
        color?: THREE.Color | string | number;
        lineWidth?: number;
        map?: THREE.Texture;
        useMap?: number;
        alphaTest?: number;
        opacity?: number;
        transparent?: boolean;
        resolution?: THREE.Vector2;
        sizeAttenuation?: number;
        dashArray?: number;
        dashOffset?: number;
        dashRatio?: number;
      } & import('@react-three/fiber').MaterialNode<MeshLineMaterial, typeof MeshLineMaterial>;
    }
  }
}