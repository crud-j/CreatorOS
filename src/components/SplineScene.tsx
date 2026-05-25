import Spline from '@splinetool/react-spline';

export default function SplineScene() {
  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center">
      <div className="w-full h-full">
        <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
      </div>
    </div>
  );
}
