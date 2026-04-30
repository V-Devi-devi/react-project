export default function Header() {
  return (
    <header className="sma-header">
      <div className="sma-header-brand">
        <span className="sma-header-logo">◆</span>
        <span className="sma-header-title">Student Management System</span>
      </div>
      <nav className="sma-header-nav">
        <span className="sma-header-nav-item sma-nav-active">Students</span>
      </nav>
    </header>
  );
}