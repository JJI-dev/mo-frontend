import React from 'react';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-4xl font-extrabold leading-10 tracking-tight text-blue-600 dark:text-blue-300">
            ⭐ MO-APP (mo.jji.kr)
          </h1>
          <p className="max-w-md text-xl leading-8 text-zinc-700 dark:text-zinc-400 mt-4">
            이 페이지는 **3001번 포트**에서 실행 중인 <span className="font-bold text-blue-700">MO-APP 고유 콘텐츠</span>입니다.
          </p>
          <p className="max-w-md text-lg leading-8 text-zinc-500 dark:text-zinc-600">
            Nginx 라우팅 및 PM2 설정 확인 완료.
          </p>
        </div>
      </main>
    </div>
  );
}
