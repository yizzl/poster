import { usePosterStore } from '../store';
import {
  FONT_OPTIONS,
  DIVIDER_STYLES,
  NUMBER_STYLES,
  LAYOUT_OPTIONS,
} from '../constants';
import type { ProductLayout, Product } from '../types';
import {
  ImagePlus,
  Trash2,
  Plus,
  ChevronUp,
  ChevronDown,
  X,
} from 'lucide-react';
import { useRef } from 'react';
import './Editor.css';

function ImageUpload({
  value,
  onChange,
  label,
  width = '100%',
  height = '120px',
}: {
  value: string | null;
  onChange: (val: string | null) => void;
  label: string;
  width?: string;
  height?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <div className="image-upload" style={{ width }}>
      <label className="upload-label">{label}</label>
      <div
        className="upload-area"
        style={{ height }}
        onClick={() => inputRef.current?.click()}
      >
        {value ? (
          <>
            <img src={value} alt={label} className="upload-preview" />
            <button
              className="upload-remove"
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
              }}
            >
              <X size={14} />
            </button>
          </>
        ) : (
          <div className="upload-placeholder">
            <ImagePlus size={24} />
            <span>点击上传</span>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        style={{ display: 'none' }}
      />
    </div>
  );
}

function ProductEditor({
  product,
  index,
  total,
}: {
  product: Product;
  index: number;
  total: number;
}) {
  const { updateProduct, removeProduct, reorderProduct } = usePosterStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    const readers = files.map(
      (file) =>
        new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        }),
    );
    Promise.all(readers).then((urls) => {
      updateProduct(product.id, { images: [...product.images, ...urls] });
    });
    e.target.value = '';
  };

  return (
    <div className="product-editor">
      <div className="product-editor-header">
        <span className="product-editor-title">制品 {product.number}</span>
        <div className="product-editor-actions">
          <button
            disabled={index === 0}
            onClick={() => reorderProduct(product.id, 'up')}
            title="上移"
          >
            <ChevronUp size={14} />
          </button>
          <button
            disabled={index === total - 1}
            onClick={() => reorderProduct(product.id, 'down')}
            title="下移"
          >
            <ChevronDown size={14} />
          </button>
          <button
            onClick={() => removeProduct(product.id)}
            title="删除"
            className="danger"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label>编号</label>
          <input
            type="text"
            value={product.number}
            onChange={(e) => updateProduct(product.id, { number: e.target.value })}
          />
        </div>
        <div className="form-field">
          <label>标签（浅色主题）</label>
          <input
            type="text"
            value={product.tag}
            placeholder="如：新刊首发"
            onChange={(e) => updateProduct(product.id, { tag: e.target.value })}
          />
        </div>
      </div>

      <div className="form-field">
        <label>制品名称</label>
        <input
          type="text"
          value={product.name}
          onChange={(e) => updateProduct(product.id, { name: e.target.value })}
        />
      </div>

      <div className="form-field">
        <label>制品说明</label>
        <textarea
          value={product.description}
          rows={2}
          onChange={(e) => updateProduct(product.id, { description: e.target.value })}
        />
      </div>

      <div className="form-row">
        <div className="form-field">
          <label>价格</label>
          <input
            type="text"
            value={product.price}
            placeholder="如 ¥30"
            onChange={(e) => updateProduct(product.id, { price: e.target.value })}
          />
        </div>
        <div className="form-field">
          <label>余量</label>
          <input
            type="text"
            value={product.stock}
            placeholder="如 余20"
            onChange={(e) => updateProduct(product.id, { stock: e.target.value })}
          />
        </div>
      </div>

      <div className="form-field">
        <label>图片布局</label>
        <select
          value={product.layout}
          onChange={(e) =>
            updateProduct(product.id, { layout: e.target.value as ProductLayout })
          }
        >
          {LAYOUT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label>制品图片</label>
        <div className="multi-image-upload">
          {product.images.map((img, i) => (
            <div key={i} className="multi-image-item">
              <img src={img} alt={`图${i + 1}`} />
              <button
                onClick={() =>
                  updateProduct(product.id, {
                    images: product.images.filter((_, j) => j !== i),
                  })
                }
              >
                <X size={12} />
              </button>
            </div>
          ))}
          <div
            className="multi-image-add"
            onClick={() => inputRef.current?.click()}
          >
            <ImagePlus size={18} />
            <span>添加</span>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleAddImage}
            style={{ display: 'none' }}
          />
        </div>
      </div>
    </div>
  );
}

export function Editor() {
  const store = usePosterStore();
  const { theme } = store;

  return (
    <div className="editor">
      <details open>
        <summary>主视觉区</summary>
        <div className="section-body">
          <ImageUpload
            value={store.mainImage}
            onChange={(val) => store.update({ mainImage: val })}
            label="主图"
            height="160px"
          />
          <div className="form-row">
            <div className="form-field">
              <label>日期</label>
              <input
                type="text"
                value={store.dateText}
                onChange={(e) => store.update({ dateText: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label>地点</label>
              <input
                type="text"
                value={store.locationText}
                onChange={(e) => store.update({ locationText: e.target.value })}
              />
            </div>
          </div>
          <div className="form-field">
            <label>侧边竖排文字</label>
            <input
              type="text"
              value={store.sideVerticalText}
              onChange={(e) => store.update({ sideVerticalText: e.target.value })}
            />
          </div>
          <div className="form-field">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={store.showAuthor}
                onChange={(e) => store.update({ showAuthor: e.target.checked })}
              />
              显示作者水印
            </label>
          </div>
          {store.showAuthor && (
            <div className="form-field">
              <label>作者/水印文字</label>
              <input
                type="text"
                value={store.authorText}
                onChange={(e) => store.update({ authorText: e.target.value })}
              />
            </div>
          )}
        </div>
      </details>

      <details open>
        <summary>标题信息</summary>
        <div className="section-body">
          <div className="form-field">
            <label>主标题</label>
            <input
              type="text"
              value={store.mainTitle}
              onChange={(e) => store.update({ mainTitle: e.target.value })}
            />
          </div>
          <div className="form-field">
            <label>英文副标题</label>
            <input
              type="text"
              value={store.englishTitle}
              onChange={(e) => store.update({ englishTitle: e.target.value })}
            />
          </div>
          <div className="form-row">
            <div className="form-field">
              <label>摊位号</label>
              <input
                type="text"
                value={store.boothNumber}
                onChange={(e) => store.update({ boothNumber: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label>分区标题</label>
              <input
                type="text"
                value={store.sectionTitle}
                onChange={(e) => store.update({ sectionTitle: e.target.value })}
              />
            </div>
          </div>
          <div className="form-field">
            <label>标语 Slogan</label>
            <input
              type="text"
              value={store.slogan}
              onChange={(e) => store.update({ slogan: e.target.value })}
            />
          </div>
        </div>
      </details>

      <details>
        <summary>字体设置</summary>
        <div className="section-body">
          <div className="form-field">
            <label>标题字体</label>
            <select
              value={store.titleFont}
              onChange={(e) => store.update({ titleFont: e.target.value })}
            >
              {FONT_OPTIONS.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-field">
            <label>正文字体</label>
            <select
              value={store.bodyFont}
              onChange={(e) => store.update({ bodyFont: e.target.value })}
            >
              {FONT_OPTIONS.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </details>

      <details>
        <summary>装饰元素</summary>
        <div className="section-body">
          <div className="form-field">
            <label>分割线样式</label>
            <select
              value={store.dividerStyle}
              onChange={(e) => store.update({ dividerStyle: e.target.value })}
            >
              {DIVIDER_STYLES.map((style) => (
                <option key={style.value} value={style.value}>
                  {style.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-field">
            <label>序号字体样式</label>
            <select
              value={store.numberStyle}
              onChange={(e) => store.update({ numberStyle: e.target.value })}
            >
              {NUMBER_STYLES.map((style) => (
                <option key={style.value} value={style.value}>
                  {style.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-field">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={store.showBackgroundDecoration}
                onChange={(e) =>
                  store.update({ showBackgroundDecoration: e.target.checked })
                }
              />
              显示背景装饰
            </label>
          </div>
        </div>
      </details>

      {theme === 'light' && (
        <details open>
          <summary>分区标签</summary>
          <div className="section-body">
            {store.sectionLabels.map((label, i) => (
              <div key={i} className="label-editor-row">
                <input
                  type="text"
                  value={label}
                  onChange={(e) => store.updateSectionLabel(i, e.target.value)}
                />
                <button
                  onClick={() => store.removeSectionLabel(i)}
                  className="danger"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            <button className="add-btn" onClick={() => store.addSectionLabel()}>
              <Plus size={14} />
              添加标签
            </button>
          </div>
        </details>
      )}

      <details open>
        <summary>制品列表 ({store.products.length})</summary>
        <div className="section-body">
          {store.products.map((product, index) => (
            <ProductEditor
              key={product.id}
              product={product}
              index={index}
              total={store.products.length}
            />
          ))}
          <button className="add-btn" onClick={() => store.addProduct()}>
            <Plus size={14} />
            添加制品
          </button>
        </div>
      </details>
    </div>
  );
}
