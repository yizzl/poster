import { usePosterStore } from '../store';

export function DarkPoster() {
  const s = usePosterStore();

  const posterBg = '#1a1a1a';
  const numberFontFamily =
    s.numberStyle === 'serif'
      ? "'Playfair Display', serif"
      : s.numberStyle === 'mono'
        ? "'Bebas Neue', monospace"
        : "'Montserrat', sans-serif";

  return (
    <div
      className="poster dark-poster"
      style={{
        background: posterBg,
        ['--accent' as string]: s.accentColor,
        ['--poster-bg' as string]: posterBg,
        fontFamily: s.bodyFont,
        color: '#fff',
      }}
    >
      {/* 主视觉区 */}
      <div className="dark-main-visual">
        {s.mainImage ? (
          <img src={s.mainImage} alt="主图" className="dark-main-image" />
        ) : (
          <div className="dark-main-placeholder img-placeholder" style={{ height: '480px' }}>
            <span>主图区域</span>
          </div>
        )}

        {/* 日期地点 */}
        <div className="dark-date-location">
          <span className="dark-date" style={{ color: s.accentColor }}>{s.dateText}</span>
          <span className="dark-location">{s.locationText}</span>
        </div>

        {/* 侧边竖排文字 */}
        {s.sideVerticalText && (
          <div className="dark-vertical-text">{s.sideVerticalText}</div>
        )}

        {/* 作者水印 */}
        {s.showAuthor && s.authorText && (
          <div className="dark-author">{s.authorText}</div>
        )}

        {/* 渐变遮罩 */}
        <div className="dark-overlay-gradient" />
      </div>

      {/* 标题区 */}
      <div className="dark-title-section">
        <h1
          className="dark-main-title"
          style={{ fontFamily: s.titleFont, color: s.accentColor }}
        >
          {s.mainTitle}
        </h1>
        {s.boothNumber && (
          <div className="dark-booth-number">{s.boothNumber}</div>
        )}
        <div className="dark-section-title-row">
          <span className={`divider ${s.dividerStyle}`}></span>
          <span
            className="dark-section-title"
            style={{ color: s.accentColor }}
          >
            {s.sectionTitle}
          </span>
          <span className={`divider ${s.dividerStyle}`}></span>
        </div>
        {s.slogan && <div className="dark-slogan">{s.slogan}</div>}
      </div>

      {/* 制品列表 */}
      <div className="dark-products">
        {s.products.map((product) => (
          <div key={product.id} className="dark-product-item">
            <div
              className="dark-product-number"
              style={{ fontFamily: numberFontFamily, color: s.accentColor }}
            >
              {product.number}
            </div>
            <div className={`dark-product-content layout-${product.layout}`}>
              {/* 图片区 */}
              <div className="dark-product-images">
                {product.images.length > 0 ? (
                  product.images.slice(0, 4).map((img, i) => (
                    <img key={i} src={img} alt={product.name} className="dark-product-img" />
                  ))
                ) : (
                  <div className="dark-product-img-placeholder img-placeholder" style={{ width: '110px', height: '110px' }}>
                    <span>图片</span>
                  </div>
                )}
              </div>
              {/* 文字区 */}
              <div className="dark-product-info">
                <div className="dark-product-name" style={{ fontFamily: s.titleFont }}>
                  {product.name}
                </div>
                {product.description && (
                  <div className="dark-product-desc">{product.description}</div>
                )}
                {(product.price || product.stock) && (
                  <div className="dark-product-meta">
                    {product.price && <span className="dark-product-price">{product.price}</span>}
                    {product.stock && <span className="dark-product-stock">{product.stock}</span>}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 底部 */}
      <div className="dark-footer" style={{ borderColor: s.accentColor }}>
        <span style={{ color: s.accentColor }}>◆</span>
      </div>
    </div>
  );
}
