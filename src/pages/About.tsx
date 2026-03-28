export default function About() {
  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="bg-white p-8 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          소개 페이지
        </h2>
        <div className="mt-4 text-gray-500">
          이 곳은 소개 페이지입니다. React Router를 통한 페이지 이동을 테스트할 수 있으며, Tailwind CSS로 스타일을 입혔습니다.
        </div>
      </div>
    </div>
  );
}
