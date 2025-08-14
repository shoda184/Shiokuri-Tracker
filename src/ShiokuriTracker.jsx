import React, { useState } from 'react';

const RemittanceTracker = () => {
  const [completedMonths, setCompletedMonths] = useState(new Set());

  const months = [
    '1月', '2月', '3月', '4月', '5月', '6月',
    '7月', '8月', '9月', '10月', '11月', '12月'
  ];

  const currentYear = new Date().getFullYear();

  const toggleMonth = (monthIndex) => {
    const newCompletedMonths = new Set(completedMonths);
    if (newCompletedMonths.has(monthIndex)) {
      newCompletedMonths.delete(monthIndex);
    } else {
      newCompletedMonths.add(monthIndex);
    }
    setCompletedMonths(newCompletedMonths);
  };

  const getCompletionRate = () => {
    return Math.round((completedMonths.size / months.length) * 100);
  };

  return (
    <div style={styles.app}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>仕送り確認アプリ</h1>
          <p style={styles.subtitle}>{currentYear}年の振込状況</p>
          <div style={styles.progressSection}>
            <div style={styles.progressBar}>
              <div 
                style={{
                  ...styles.progressFill,
                  width: `${getCompletionRate()}%`
                }}
              ></div>
            </div>
            <span style={styles.progressText}>
              {completedMonths.size}/{months.length} 完了 ({getCompletionRate()}%)
            </span>
          </div>
        </header>

        <main style={styles.main}>
          <div style={styles.monthsGrid}>
            {months.map((month, index) => (
              <div 
                key={index}
                style={{
                  ...styles.monthCard,
                  ...(completedMonths.has(index) ? styles.monthCardCompleted : styles.monthCardPending)
                }}
              >
                <div style={styles.monthHeader}>
                  <h3 style={styles.monthName}>{month}</h3>
                  <div style={{
                    ...styles.statusIcon,
                    ...(completedMonths.has(index) ? styles.statusIconCompleted : styles.statusIconPending)
                  }}>
                    {completedMonths.has(index) ? '✓' : '○'}
                  </div>
                </div>
                <div style={styles.monthBody}>
                  <p style={styles.statusText}>
                    {completedMonths.has(index) ? '振込完了' : '未完了'}
                  </p>
                  <button 
                    style={{
                      ...styles.toggleBtn,
                      ...(completedMonths.has(index) ? styles.toggleBtnCompleted : styles.toggleBtnPending)
                    }}
                    onClick={() => toggleMonth(index)}
                  >
                    {completedMonths.has(index) ? '完了を取消' : '完了にする'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>

        <footer style={styles.footer}>
          <p>最終更新: {new Date().toLocaleDateString('ja-JP')}</p>
        </footer>
      </div>
    </div>
  );
};

const styles = {
  app: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
    padding: '20px'
  },
  
  container: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  
  header: {
    textAlign: 'center',
    marginBottom: '3rem',
    color: 'white'
  },
  
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    margin: '0 0 0.5rem 0',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
  },
  
  subtitle: {
    fontSize: '1.2rem',
    margin: '0 0 2rem 0',
    opacity: '0.9'
  },
  
  progressSection: {
    maxWidth: '400px',
    margin: '0 auto'
  },
  
  progressBar: {
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '25px',
    height: '12px',
    overflow: 'hidden',
    marginBottom: '0.5rem'
  },
  
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #4CAF50, #81C784)',
    borderRadius: '25px',
    transition: 'width 0.3s ease'
  },
  
  progressText: {
    fontSize: '0.9rem',
    fontWeight: '500'
  },
  
  main: {
    marginBottom: '2rem'
  },
  
  monthsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
    marginTop: '2rem'
  },
  
  monthCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    border: '3px solid transparent',
    cursor: 'pointer'
  },
  
  monthCardCompleted: {
    borderColor: '#4CAF50',
    background: 'linear-gradient(135deg, #f8fff8 0%, #e8f5e8 100%)'
  },
  
  monthCardPending: {
    borderColor: '#ff9800',
    background: 'linear-gradient(135deg, #fffbf0 0%, #fff3e0 100%)'
  },
  
  monthHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  
  monthName: {
    fontSize: '1.5rem',
    fontWeight: '600',
    margin: '0',
    color: '#333'
  },
  
  statusIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: 'white',
    transition: 'all 0.3s ease'
  },
  
  statusIconCompleted: {
    background: '#4CAF50'
  },
  
  statusIconPending: {
    background: 'white',
    border: '2px solid #ff9800',
    color: '#ff9800'
  },
  
  monthBody: {
    textAlign: 'center'
  },
  
  statusText: {
    fontSize: '1rem',
    margin: '0 0 1rem 0',
    fontWeight: '500',
    color: '#666'
  },
  
  toggleBtn: {
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    minWidth: '120px'
  },
  
  toggleBtnCompleted: {
    background: '#f44336',
    color: 'white'
  },
  
  toggleBtnPending: {
    background: '#4CAF50',
    color: 'white'
  },
  
  footer: {
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '0.9rem',
    marginTop: '2rem'
  }
};

export default ShiokuriTracker;
