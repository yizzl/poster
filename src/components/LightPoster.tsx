import { usePosterStore } from '../store';

export function LightPoster() {
  const s = usePosterStore();

  const posterBg = '#f5f5f5';
  const numberFontFamily =
    s.numberStyle === 'serif'
      ? "'Playfair Display', serif"
      : s.numberStyle === 'mono'
        ? "'Bebas Neue', monospace"
        : "'Montserrat', sans-serif";

  return (
    <div
      className="poster light-poster"
      style={{
        background: posterBg,
        ['--accent' as string]: s.accentColor,
        ['--poster-bg' as string]: posterBg,
        fontFamily: s.bodyFont,
        color: '#333',
      }}
    >
      {/* 标题区 */}
      <div className="light-title-section">
        {s.mainImage && (
          <div className="light-main-image-wrap">
            <img src={s.mainImage} alt="主图" className="light-main-image" />
          </div>
        )}
        <h1
          className="light-main-title"
          style={{ fontFamily: s.titleFont, color: s.accentColor }}
        >
          {s.mainTitle}
        </h1>
        {s.englishTitle && (
          <div className="light-english-title">{s.englishTitle}</div>
        )}
        {(s.dateText || s.locationText) && (
          <div className="light-date-location">
            {s.dateText && <span>{s.dateText}</span>}
            {s.dateText && s.locationText && <span className="light-dot">·</span>}
            {s.locationText && <span>{s.locationText}</span>}
            {s.boothNumber && (
              <>
                <span className="light-dot">·</span>
                <span>{s.boothNumber}</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* 分区标签 */}
      {s.sectionLabels.length > 0 && (
        <div className="light-section-labels">
          {s.sectionLabels.map((label, i) => (
            <span
              key={i}
              className="light-section-label"
              style={{
                background: s.accentColor,
                opacity: i === 0 ? 1 : 0.5 + (1 - i * 0.15),
              }}
            >
              {label}
            </span>
          ))}
        </div>
      )}

      {/* 制品列表 */}
      <div className="light-products">
        {s.products.map((product) => (
          <div key={product.id} className="light-product-item">
            {/* 背景装饰 */}
            {s.showBackgroundDecoration && (
              <div className="light-x-decoration" style={{ borderColor: s.accentColor }}>
                <span></span>
                <span></span>
              </div>
            )}

            {/* 图片区 */}
            <div className={`light-product-images layout-${product.layout}`}>
              {product.images.length > 0 ? (
                product.images.slice(0, 4).map((img, i) => (
                  <img key={i} src={img} alt={product.name} className="light-product-img" />
                ))
              ) : (
                <div className="light-product-img-placeholder img-placeholder" style={{ width: '100px', height: '100px' }}>
                  <span>图片</span>
                </div>
              )}
            </div>

            {/* 文字区 */}
            <div className="light-product-info">
              <div className="light-product-info-top">
                <span
                  className="light-product-number"
                  style={{ fontFamily: numberFontFamily, color: s.accentColor }}
                >
                  {product.number}
                </span>
                {product.tag && (
                  <span
                    className="light-product-tag"
                    style={{ background: s.accentColor }}
                  >
                    {product.tag}
                  </span>
                )}
              </div>
              <div className="light-product-name" style={{ fontFamily: s.titleFont }}>
                {product.name}
              </div>
              {product.description && (
                <div className="light-product-desc">{product.description}</div>
              )}
              {(product.price || product.stock) && (
                <div className="light-product-meta">
                  {product.price && (
                    <span className="light-product-price" style={{ color: s.accentColor }}>
                      {product.price}
                    </span>
                  )}
                  {product.stock && (
                    <span className="light-product-stock">{product.stock}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 底部 */}
      <div className="light-footer">
        {s.showAuthor && s.authorText && (
          <span className="light-author">{s.authorText}</span>
        )}
      </div>
    </div>
  );
}
