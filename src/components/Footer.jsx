import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">M</div>
              <div>
                <div className="font-semibold text-white">MaiWay</div>
                <div className="text-xs">Mobile trust & brand protection</div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-6">
            <a href="#" className="text-sm hover:text-white">Privacy</a>
            <a href="#" className="text-sm hover:text-white">Terms</a>
            <a href="#" className="text-sm hover:text-white">Security</a>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-700 pt-6 text-sm text-slate-500">© {new Date().getFullYear()} MaiWay. All rights reserved.</div>
      </div>
    </footer>
  );
}