const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-gray-800 text-yellow-300 px-4 py-8">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by ACME
          Industries Ltd
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
