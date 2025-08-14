import React, { useState, useEffect } from 'react';
import { Check, X, Calendar, Bell, AlertCircle, Clock, TrendingUp, DollarSign } from 'lucide-react';

const ShiokuriTracker = () => {
  const [transfers, setTransfers] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());

  // 初期化: 過去12ヶ月と未来3ヶ月のデータを準備
  useEffect(() => {
    const initialTransfers = {};
    const now = new Date();
    
    // 過去12ヶ月から未来3ヶ月まで
    for (let i = -12; i <= 3; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() + i, 1);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      initialTransfers[key] = {
        completed: false,
        completedDate: null,
        dueDate: new Date(date.getFullYear(), date.getMonth() + 1, 1),
        isOverdue: false,
        amount: 50000 // デフォルト金額
      };
    }
    
    setTransfers(initialTransfers);
  }, []);

  // 期限チェック
  useEffect(() => {
    const checkOverdue = () => {
      const now = new Date();
      setTransfers(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(key => {
          if (!updated[key].completed) {
            updated[key].isOverdue = now > updated[key].dueDate;
          }
        });
        return updated;
      });
    };

    checkOverdue();
    const interval = setInterval(checkOverdue, 60000);
    return () => clearInterval(interval);
  }, []);

  const toggleTransferStatus = (monthKey) => {
    setTransfers(prev => ({
      ...prev,
      [monthKey]: {
        ...prev[monthKey],
        completed: !prev[monthKey].completed,
        completedDate: !prev[monthKey].completed ? new Date() : null,
        isOverdue: false
      }
    }));
  };

  const getMonthDisplay = (monthKey) => {
    const [year, month] = monthKey.split('-');
    return `${year}年${month}月`;
  };

  const getStatusColor = (transfer) => {
    if (transfer.completed) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (transfer.isOverdue) return 'text-red-600 bg-red-50 border-red-200';
    return 'text-amber-600 bg-amber-50 border-amber-200';
  };

  const getStatusIcon = (transfer) => {
    if (transfer.completed) return <Check className="w-5 h-5" />;
    if (transfer.isOverdue) return <AlertCircle className="w-5 h-5" />;
    return <Clock className="w-5 h-5" />;
  };

  const sortedTransfers = Object.entries(transfers).sort(([a], [b]) => b.localeCompare(a));
  const overdueCount = Object.values(transfers).filter(t => t.isOverdue).length;
  const completedCount = Object.values(transfers).filter(t => t.completed).length;
  const totalAmount = Object.values(transfers).filter(t => t.completed).reduce((sum, t) => sum + t.amount, 0);
  const pendingCount = Object.values(transfers).length - completedCount - overdueCount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-lg">
            <Calendar className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            仕送り管理システム
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            毎月の仕送り状況を効率的に管理し、家族の安心をサポートします
          </p>
        </div>

        {/* サマリーカード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-600 mb-1">完了済み</p>
                <p className="text-3xl font-bold text-gray-900">{completedCount}</p>
                <p className="text-xs text-gray-500 mt-1">件の振込完了</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Check className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600 mb-1">期限切れ</p>
                <p className="text-3xl font-bold text-gray-900">{overdueCount}</p>
                <p className="text-xs text-gray-500 mt-1">件の未完了</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-600 mb-1">未完了</p>
                <p className="text-3xl font-bold text-gray-900">{pendingCount}</p>
                <p className="text-xs text-gray-500 mt-1">件の予定</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 mb-1">総送金額</p>
                <p className="text-3xl font-bold text-gray-900">¥{totalAmount.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">累計金額</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* 月別リスト */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/20">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-8">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6" />
              <h2 className="text-2xl font-bold">月別仕送り状況</h2>
            </div>
            <p className="text-blue-100">各月の振込状況を確認・更新できます</p>
          </div>

          <div className="divide-y divide-gray-100">
            {sortedTransfers.map(([monthKey, transfer]) => (
              <div 
                key={monthKey} 
                className="p-6 hover:bg-white/50 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className={`p-4 rounded-2xl border-2 ${getStatusColor(transfer)} group-hover:scale-110 transition-transform duration-200`}>
                      {getStatusIcon(transfer)}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {getMonthDisplay(monthKey)}
                      </h3>
                      <div className="text-sm text-gray-600 mb-2">
                        {transfer.completed ? (
                          <span className="text-emerald-600 font-medium flex items-center gap-1">
                            <Check className="w-4 h-4" />
                            完了済み ({transfer.completedDate?.toLocaleDateString('ja-JP')})
                          </span>
                        ) : transfer.isOverdue ? (
                          <span className="text-red-600 font-medium flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            期限切れ (期限: {transfer.dueDate.toLocaleDateString('ja-JP')})
                          </span>
                        ) : (
                          <span className="text-amber-600 font-medium flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            未完了 (期限: {transfer.dueDate.toLocaleDateString('ja-JP')})
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        金額: ¥{transfer.amount.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleTransferStatus(monthKey)}
                    className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${
                      transfer.completed
                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300 shadow-md'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {transfer.completed ? '未完了にする' : '完了マーク'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LINE Bot設定セクション */}
        <div className="mt-10 bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <Bell className="w-5 h-5 text-green-600" />
            </div>
            LINE Bot通知設定
          </h3>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-blue-900 mb-2">実装予定機能</h4>
                <ul className="text-blue-800 space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    毎月1日の午前中に振込確認の通知を自動送信
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    期限を過ぎた場合の追加通知機能
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    LINE Bot APIとWebhookサーバーの連携
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* フッター */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            © 2025 仕送り管理システム - 家族の安心をサポート
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShiokuriTracker;