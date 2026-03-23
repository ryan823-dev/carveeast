/**
 * 艺术品分类系统
 * Art Category System for CarveEast
 *
 * 支持多种中国艺术品类型：
 * - 篆刻印章 (Seal Carvings)
 * - 字画书法 (Calligraphy & Paintings)
 * - 紫砂壶 (Yixing Teaware)
 * - 瓷器 (Porcelain)
 * - 雕塑 (Sculptures)
 * - 玉石雕刻 (Jade/Stone Carvings)
 * - 漆器 (Lacquerware)
 * - 刺绣 (Embroidery)
 */

// ============================================================================
// 产品类型定义
// ============================================================================

export type ProductCategory =
  | 'seal_carving'      // 篆刻印章
  | 'calligraphy'       // 书法
  | 'painting'          // 绘画
  | 'yixing_teaware'    // 紫砂壶
  | 'porcelain'         // 瓷器
  | 'sculpture'         // 雕塑
  | 'jade_carving'      // 玉石雕刻
  | 'lacquerware'       // 漆器
  | 'embroidery'         // 刺绣
  | 'other';            // 其他

export const PRODUCT_CATEGORIES: Record<ProductCategory, {
  label: string;
  labelCn: string;
  labelEn: string;
  description: string;
  icon: string;
}> = {
  seal_carving: {
    label: 'Seal Carving',
    labelCn: '篆刻印章',
    labelEn: 'Seal Carvings',
    description: 'Traditional Chinese seal engravings in various stones',
    icon: '印',
  },
  calligraphy: {
    label: 'Calligraphy',
    labelCn: '书法',
    labelEn: 'Calligraphy Works',
    description: 'Brush calligraphy in various scripts',
    icon: '書',
  },
  painting: {
    label: 'Painting',
    labelCn: '绘画',
    labelEn: 'Ink Paintings',
    description: 'Chinese painting including landscape, flower, and bird',
    icon: '畫',
  },
  yixing_teaware: {
    label: 'Yixing Teaware',
    labelCn: '紫砂壶',
    labelEn: 'Yixing Clay Teapots',
    description: 'Handcrafted Yixing clay teapots and cups',
    icon: '壶',
  },
  porcelain: {
    label: 'Porcelain',
    labelCn: '瓷器',
    labelEn: 'Chinese Porcelain',
    description: 'Fine porcelain including blue and white, cloisonne',
    icon: '瓷',
  },
  sculpture: {
    label: 'Sculpture',
    labelCn: '雕塑',
    labelEn: 'Sculptures',
    description: 'Three-dimensional art pieces in various materials',
    icon: '雕',
  },
  jade_carving: {
    label: 'Jade Carving',
    labelCn: '玉石雕刻',
    labelEn: 'Jade & Stone Carvings',
    description: 'Exquisite carvings in jade, agate, and other stones',
    icon: '玉',
  },
  lacquerware: {
    label: 'Lacquerware',
    labelCn: '漆器',
    labelEn: 'Lacquerware',
    description: 'Traditional Chinese lacquerware with intricate designs',
    icon: '漆',
  },
  embroidery: {
    label: 'Embroidery',
    labelCn: '刺绣',
    labelEn: 'Chinese Embroidery',
    description: 'Hand embroidery including Suzhou, Hunan, and Guangdong styles',
    icon: '绣',
  },
  other: {
    label: 'Other',
    labelCn: '其他',
    labelEn: 'Other Crafts',
    description: 'Other traditional Chinese handicrafts',
    icon: '艺',
  },
};

// ============================================================================
// 产品状态
// ============================================================================

export type ProductStatus =
  | 'available'         // 可售
  | 'sold'              // 已售
  | 'reserved'          // 预留
  | 'in_auction'        // 拍卖中
  | 'custom_order'      // 接受定制
  | 'not_for_sale';     // 非卖品

export const PRODUCT_STATUS: Record<ProductStatus, {
  label: string;
  labelCn: string;
  color: string;
}> = {
  available: { label: 'Available', labelCn: '可售', color: 'green' },
  sold: { label: 'Sold', labelCn: '已售', color: 'red' },
  reserved: { label: 'Reserved', labelCn: '预留', color: 'yellow' },
  in_auction: { label: 'In Auction', labelCn: '拍卖中', color: 'blue' },
  custom_order: { label: 'Custom Order', labelCn: '接受定制', color: 'purple' },
  not_for_sale: { label: 'Not For Sale', labelCn: '非卖品', color: 'gray' },
};

// ============================================================================
// 石料材质（篆刻印章）
// ============================================================================

export const STONE_MATERIALS = [
  { value: 'qingtian', label: '青田石', labelEn: 'Qingtian Stone', description: 'From Zhejiang, known for fine grain' },
  { value: 'shoushan', label: '寿山石', labelEn: 'Shoushan Stone', description: 'From Fujian, prized for color variations' },
  { value: 'changhua', label: '昌化石', labelEn: 'Changhua Stone', description: 'From Zhejiang, often with mineral patterns' },
  { value: 'balin', label: '巴林石', labelEn: 'Balin Stone', description: 'From Inner Mongolia, similar to Shoushan' },
  { value: 'india_red', label: '印度红', labelEn: 'India Red', description: 'Dense red stone from India' },
  { value: 'tianhuang', label: '田黄', labelEn: 'Tianhuang Stone', description: 'Field-yellow Shoushan, most precious' },
  { value: 'mudidi', label: '母鸡底', labelEn: 'Mudidi', description: 'Unique Shoushan variety' },
  { value: 'laizhou', label: '莱州玉', labelEn: 'Laizhou Jade', description: 'Jade-like stone from Shandong' },
  { value: 'hetian', label: '和田玉', labelEn: 'Hetian Jade', description: 'Famous jade from Xinjiang' },
  { value: 'jadeite', label: '翡翠', labelEn: 'Jadeite', description: 'Myanmar jade, green varieties most valued' },
  { value: 'other', label: '其他', labelEn: 'Other', description: 'Other stone materials' },
] as const;

// ============================================================================
// 篆刻风格
// ============================================================================

export const CARVING_STYLES = [
  { value: 'yishan', label: '黟山派', labelEn: 'Yishan School', description: 'Elegant and refined style' },
  { value: 'zhe', label: '浙派', labelEn: 'Zhe School', description: 'Zhejiang provincial style' },
  { value: 'wan', label: '皖派', labelEn: 'Wan School', description: 'Anhui provincial style' },
  { value: 'jing', label: '京派', labelEn: 'Jing School', description: 'Beijing metropolitan style' },
  { value: 'min', label: '闽派', labelEn: 'Min School', description: 'Fujian provincial style' },
  { value: 'lu', label: '鲁派', labelEn: 'Lu School', description: 'Shandong provincial style' },
  { value: 'traditional', label: '传统一路', labelEn: 'Traditional Style', description: 'Classical approach' },
  { value: 'contemporary', label: '当代一路', labelEn: 'Contemporary Style', description: 'Modern interpretation' },
  { value: 'han_style', label: '汉印风格', labelEn: 'Han Dynasty Style', description: 'Archaistic Han period style' },
] as const;

// ============================================================================
// 印面章法
// ============================================================================

export const SEAL_LAYOUTS = [
  { value: 'huiwen', label: '回文', labelEn: 'Circular Layout', description: 'Readable in circular direction' },
  { value: 'manbai', label: '满白', labelEn: 'Solid Layout', description: 'Thick, bold characters' },
  { value: 'cuwen', label: '粗文', labelEn: 'Bold Layout', description: 'Heavy, substantial strokes' },
  { value: 'xiwen', label: '细文', labelEn: 'Fine Layout', description: 'Delicate, refined strokes' },
  { value: 'chouhe', label: '丑荷', labelEn: 'Chouhe', description: 'Interlocking lotus root pattern' },
  { value: 'free', label: '自由章法', labelEn: 'Free Layout', description: 'Free-form composition' },
] as const;

// ============================================================================
// 字体类型
// ============================================================================

export const SCRIPT_TYPES = [
  { value: 'zhuanshu', label: '篆书', labelEn: 'Seal Script', description: 'Ancient clerical script' },
  { value: 'lishu', label: '隶书', labelEn: 'Clerical Script', description: 'Official Han dynasty script' },
  { value: 'kaishu', label: '楷书', labelEn: 'Regular Script', description: 'Standard modern script' },
  { value: 'xingshu', label: '行书', labelEn: 'Running Script', description: 'Semi-cursive, flowing' },
  { value: 'caoshu', label: '草书', labelEn: 'Cursive Script', description: 'Wild cursive style' },
] as const;

// ============================================================================
// 紫砂壶泥料
// ============================================================================

export const YIXING_CLAYS = [
  { value: 'zhisha', label: '朱泥', labelEn: 'Zhisha (Vermillion)', description: 'Bright red, fine texture' },
  { value: 'duanni', label: '段泥', labelEn: 'Duanni', description: 'Yellow-brown, sandy texture' },
  { value: 'lanni', label: '蓝泥', labelEn: 'Lanni (Blue Clay)', description: 'Blue-grey when fired' },
  { value: 'heishali', label: '黑砂李', labelEn: 'Heishali (Black Sand)', description: 'Dark purple-black' },
  { value: 'zisha', label: '紫泥', labelEn: 'Zisha (Purple Clay)', description: 'Classic purple clay' },
  { value: 'gaoliangni', label: '老段泥', labelEn: 'Gaoliangni (Old Duan)', description: 'Aged duanni variety' },
  { value: 'baishini', label: '白水泥', labelEn: 'Baishini (White Clay)', description: 'Light colored, rare' },
] as const;

// ============================================================================
// 瓷器类型
// ============================================================================

export const PORCELAIN_TYPES = [
  { value: 'blue_white', label: '青花瓷', labelEn: 'Blue & White', description: 'Underglaze blue on white' },
  { value: 'colored', label: '彩瓷', labelEn: 'Colored Porcelain', description: 'Polychrome decorations' },
  { value: 'celadon', label: '青瓷', labelEn: 'Celadon', description: 'Jade-green glaze' },
  { value: 'blanc_de_chine', label: '德化白瓷', labelEn: 'Blanc de Chine', description: 'Dehua white porcelain' },
  { value: 'cloisonne', label: '景泰蓝', labelEn: 'Cloisonne', description: 'Enamel copperwork' },
  { value: 'famille_rose', label: '粉彩', labelEn: 'Famille Rose', description: 'Pink family enamel colors' },
  { value: 'jun', label: '钧窑', labelEn: 'Jun Glaze', description: 'Splashed glaze effect' },
] as const;

// ============================================================================
// 书画装裱形式
// ============================================================================

export const MOUNTING_STYLES = [
  { value: 'scroll', label: '卷轴', labelEn: 'Hanging Scroll', description: 'Vertical scroll for wall display' },
  { value: 'album', label: '册页', labelEn: 'Album Leaf', description: 'Book format pages' },
  { value: 'handscroll', label: '手卷', labelEn: 'Handscroll', description: 'Horizontal scroll for table viewing' },
  { value: 'framed', label: '装框', labelEn: 'Framed', description: 'Mounted and framed' },
  { value: 'unmounted', label: '未裱', labelEn: 'Unmounted', description: 'Flat paper/canvas only' },
] as const;

// ============================================================================
// 辅助函数
// ============================================================================

export function getCategoryLabel(category: ProductCategory): string {
  return PRODUCT_CATEGORIES[category]?.labelCn || category;
}

export function getCategoryIcon(category: ProductCategory): string {
  return PRODUCT_CATEGORIES[category]?.icon || '艺';
}

export function getStatusColor(status: ProductStatus): string {
  return PRODUCT_STATUS[status]?.color || 'gray';
}

export function formatPrice(price: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDimensions(dimensions: {
  width?: number;
  height?: number;
  depth?: number;
  unit?: string;
}): string {
  const unit = dimensions.unit || 'cm';
  const parts: string[] = [];

  if (dimensions.width) parts.push(`${dimensions.width}${unit}`);
  if (dimensions.height) parts.push(`×${dimensions.height}${unit}`);
  if (dimensions.depth) parts.push(`×${dimensions.depth}${unit}`);

  return parts.join('') || 'N/A';
}
