import { Product } from '@/types'

export const products: Product[] = [
  // === HORTIFRUTI - Frutas ===
  {
    id: '1', slug: 'banana-prata-kg', name: 'Banana Prata 1kg (aprox. 6 Unid.)',
    description: 'Banana prata selecionada, madura e saborosa. Rica em potássio e vitaminas.',
    price: 4.99, originalPrice: 6.50, unit: 'kg', weight: '1kg',
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400&h=400&fit=crop',
    category: 'Frutas', categorySlug: 'frutas',
    department: 'Hortifruti', departmentSlug: 'hortifruti',
    isOffer: true, discountPercent: 23, isBestSeller: true, isFeatured: true, stock: 50,
    brand: 'In Natura', tags: ['fruta', 'banana', 'hortifruti'],
  },
  {
    id: '2', slug: 'maca-gala-kg', name: 'Maçã Gala 1kg (aprox. 4 Unid.)',
    description: 'Maçã gala nacional, crocante e doce. Ótima fonte de fibras.',
    price: 7.99, unit: 'kg', weight: '1kg',
    image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=400&fit=crop',
    category: 'Frutas', categorySlug: 'frutas',
    department: 'Hortifruti', departmentSlug: 'hortifruti',
    isOffer: false, isBestSeller: true, isFeatured: false, stock: 40,
    brand: 'In Natura', tags: ['fruta', 'maçã', 'hortifruti'],
  },
  {
    id: '3', slug: 'laranja-pera-kg', name: 'Laranja Pêra 1kg (aprox. 4 Unid.)',
    description: 'Laranja pêra suculenta, ideal para suco ou consumo in natura.',
    price: 3.49, originalPrice: 4.99, unit: 'kg',
    image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=400&fit=crop',
    category: 'Frutas', categorySlug: 'frutas',
    department: 'Hortifruti', departmentSlug: 'hortifruti',
    isOffer: true, discountPercent: 30, isBestSeller: false, isFeatured: true, stock: 60,
    brand: 'In Natura', tags: ['fruta', 'laranja', 'suco'],
  },
  {
    id: '4', slug: 'tomate-salada-500g', name: 'Tomate Salada 500g (aprox. 3 Unid.)',
    description: 'Tomate salada vermelho e firme, perfeito para saladas e molhos.',
    price: 4.98, originalPrice: 5.99, unit: '500g',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=400&fit=crop',
    category: 'Legumes', categorySlug: 'legumes',
    department: 'Hortifruti', departmentSlug: 'hortifruti',
    isOffer: true, discountPercent: 17, isBestSeller: true, isFeatured: true, stock: 80,
    brand: 'In Natura', tags: ['legume', 'tomate', 'salada'],
  },
  {
    id: '5', slug: 'cebola-media-500g', name: 'Cebola Média 500g (aprox. 3 Unid.)',
    description: 'Cebola média nacional, essencial na cozinha brasileira.',
    price: 3.18, unit: '500g',
    image: 'https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?w=400&h=400&fit=crop',
    category: 'Legumes', categorySlug: 'legumes',
    department: 'Hortifruti', departmentSlug: 'hortifruti',
    isOffer: false, isBestSeller: true, isFeatured: false, stock: 100,
    brand: 'In Natura', tags: ['legume', 'cebola', 'tempero'],
  },
  {
    id: '6', slug: 'alface-crespa', name: 'Alface Crespa (1 Unid.)',
    description: 'Alface crespa fresca, crocante e nutritiva.',
    price: 2.49, unit: 'un',
    image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=400&fit=crop',
    category: 'Verduras', categorySlug: 'verduras',
    department: 'Hortifruti', departmentSlug: 'hortifruti',
    isOffer: false, isBestSeller: false, isFeatured: false, stock: 30,
    brand: 'In Natura', tags: ['verdura', 'alface', 'salada'],
  },
  {
    id: '7', slug: 'batata-extra-500g', name: 'Batata Extra 500g (aprox. 4 Unid.)',
    description: 'Batata inglesa extra, ótima para fritar, cozinhar ou assar.',
    price: 4.49, originalPrice: 5.99, unit: '500g',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=400&fit=crop',
    category: 'Legumes', categorySlug: 'legumes',
    department: 'Hortifruti', departmentSlug: 'hortifruti',
    isOffer: true, discountPercent: 25, isBestSeller: true, isFeatured: false, stock: 70,
    brand: 'In Natura', tags: ['legume', 'batata', 'frito'],
  },
  {
    id: '8', slug: 'mamao-formosa', name: 'Mamão Formosa (aprox. 1,5kg)',
    description: 'Mamão formosa maduro, doce e rico em vitamina C.',
    price: 8.99, originalPrice: 11.99, unit: 'un',
    image: 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=400&h=400&fit=crop',
    category: 'Frutas', categorySlug: 'frutas',
    department: 'Hortifruti', departmentSlug: 'hortifruti',
    isOffer: true, discountPercent: 25, isBestSeller: false, isFeatured: true, stock: 25,
    brand: 'In Natura', tags: ['fruta', 'mamão', 'tropical'],
  },

  // === AÇOUGUE ===
  {
    id: '9', slug: 'frango-inteiro-kg', name: 'Frango Inteiro Resfriado 1kg',
    description: 'Frango inteiro resfriado de primeira qualidade, sem antibióticos.',
    price: 8.99, originalPrice: 11.49, unit: 'kg',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=400&fit=crop',
    category: 'Frango', categorySlug: 'frango',
    department: 'Açougue', departmentSlug: 'acougue',
    isOffer: true, discountPercent: 22, isBestSeller: true, isFeatured: true, stock: 30,
    brand: 'Sadia', tags: ['frango', 'carne', 'proteína'],
  },
  {
    id: '10', slug: 'coxao-mole-kg', name: 'Coxão Mole Bovino 1kg',
    description: 'Coxão mole bovino fresco, ideal para assados e bifes.',
    price: 34.90, unit: 'kg',
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=400&fit=crop',
    category: 'Carnes Bovinas', categorySlug: 'carnes-bovinas',
    department: 'Açougue', departmentSlug: 'acougue',
    isOffer: false, isBestSeller: true, isFeatured: false, stock: 20,
    brand: 'Açougue Local', tags: ['carne', 'bovino', 'assado'],
  },
  {
    id: '11', slug: 'peito-frango-kg', name: 'Peito de Frango Sem Osso 1kg',
    description: 'Peito de frango sem osso e sem pele, magro e proteico.',
    price: 14.99, originalPrice: 18.99, unit: 'kg',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=400&fit=crop',
    category: 'Frango', categorySlug: 'frango',
    department: 'Açougue', departmentSlug: 'acougue',
    isOffer: true, discountPercent: 21, isBestSeller: true, isFeatured: true, stock: 25,
    brand: 'Sadia', tags: ['frango', 'peito', 'magro'],
  },
  {
    id: '12', slug: 'linguica-calabresa-kg', name: 'Linguiça Calabresa Defumada 1kg',
    description: 'Linguiça calabresa defumada, sabor marcante e suculento.',
    price: 19.90, originalPrice: 24.90, unit: 'kg',
    image: 'https://images.unsplash.com/photo-1606851094291-6efae152bb87?w=400&h=400&fit=crop',
    category: 'Linguiças', categorySlug: 'linguicas',
    department: 'Açougue', departmentSlug: 'acougue',
    isOffer: true, discountPercent: 20, isBestSeller: false, isFeatured: true, stock: 15,
    brand: 'Perdigão', tags: ['linguiça', 'calabresa', 'churrasco'],
  },

  // === LATICÍNIOS ===
  {
    id: '13', slug: 'leite-integral-1l', name: 'Leite Integral UHT 1L',
    description: 'Leite integral UHT de alta qualidade, rico em cálcio e vitaminas.',
    price: 4.79, originalPrice: 5.49, unit: 'un',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop',
    category: 'Leite', categorySlug: 'leite',
    department: 'Laticínios', departmentSlug: 'laticinios',
    isOffer: true, discountPercent: 13, isBestSeller: true, isFeatured: true, stock: 100,
    brand: 'Italac', tags: ['leite', 'laticínio', 'cálcio'],
  },
  {
    id: '14', slug: 'queijo-mussarela-kg', name: 'Queijo Mussarela Fatiado 200g',
    description: 'Queijo mussarela fatiado, cremoso e saboroso.',
    price: 7.99, unit: '200g',
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=400&fit=crop',
    category: 'Queijos', categorySlug: 'queijos',
    department: 'Laticínios', departmentSlug: 'laticinios',
    isOffer: false, isBestSeller: true, isFeatured: false, stock: 45,
    brand: 'Tirolez', tags: ['queijo', 'mussarela', 'laticínio'],
  },
  {
    id: '15', slug: 'iogurte-natural-170g', name: 'Iogurte Natural Integral 170g',
    description: 'Iogurte natural integral, cremoso e sem adição de açúcar.',
    price: 2.99, originalPrice: 3.79, unit: 'un',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop',
    category: 'Iogurte', categorySlug: 'iogurte',
    department: 'Laticínios', departmentSlug: 'laticinios',
    isOffer: true, discountPercent: 21, isBestSeller: false, isFeatured: true, stock: 60,
    brand: 'Danone', tags: ['iogurte', 'natural', 'probiótico'],
  },
  {
    id: '16', slug: 'manteiga-extra-200g', name: 'Manteiga Extra com Sal 200g',
    description: 'Manteiga extra com sal, sabor rico e textura cremosa.',
    price: 8.49, originalPrice: 9.99, unit: 'un',
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&h=400&fit=crop',
    category: 'Manteiga e Margarina', categorySlug: 'manteiga',
    department: 'Laticínios', departmentSlug: 'laticinios',
    isOffer: true, discountPercent: 15, isBestSeller: true, isFeatured: false, stock: 35,
    brand: 'Aviação', tags: ['manteiga', 'laticínio', 'gordura'],
  },

  // === BEBIDAS ===
  {
    id: '17', slug: 'coca-cola-2l', name: 'Refrigerante Coca-Cola 2L',
    description: 'Coca-Cola original gelada, o refrigerante mais famoso do mundo.',
    price: 9.99, originalPrice: 11.99, unit: 'un',
    image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=400&fit=crop',
    category: 'Refrigerantes', categorySlug: 'refrigerantes',
    department: 'Bebidas', departmentSlug: 'bebidas',
    isOffer: true, discountPercent: 17, isBestSeller: true, isFeatured: true, stock: 80,
    brand: 'Coca-Cola', tags: ['refrigerante', 'coca-cola', 'bebida'],
  },
  {
    id: '18', slug: 'agua-mineral-1-5l', name: 'Água Mineral Natural 1,5L',
    description: 'Água mineral natural sem gás, pura e refrescante.',
    price: 2.49, unit: 'un',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=400&fit=crop',
    category: 'Águas', categorySlug: 'aguas',
    department: 'Bebidas', departmentSlug: 'bebidas',
    isOffer: false, isBestSeller: true, isFeatured: false, stock: 120,
    brand: 'Crystal', tags: ['água', 'hidratação', 'natural'],
  },
  {
    id: '19', slug: 'suco-del-valle-1l', name: 'Suco Del Valle Uva 1L',
    description: 'Suco de uva Del Valle, feito com frutas selecionadas, sem conservantes.',
    price: 6.99, originalPrice: 8.49, unit: 'un',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=400&fit=crop',
    category: 'Sucos', categorySlug: 'sucos',
    department: 'Bebidas', departmentSlug: 'bebidas',
    isOffer: true, discountPercent: 18, isBestSeller: false, isFeatured: true, stock: 55,
    brand: 'Del Valle', tags: ['suco', 'uva', 'bebida'],
  },
  {
    id: '20', slug: 'cerveja-brahma-lata-350ml', name: 'Cerveja Brahma Latão 350ml',
    description: 'Cerveja Brahma gelada, sabor suave e refrescante.',
    price: 3.99, originalPrice: 4.99, unit: 'un',
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=400&fit=crop',
    category: 'Cervejas', categorySlug: 'cervejas',
    department: 'Bebidas', departmentSlug: 'bebidas',
    isOffer: true, discountPercent: 20, isBestSeller: true, isFeatured: true, stock: 200,
    brand: 'Brahma', tags: ['cerveja', 'bebida alcoólica', 'gelada'],
  },
  {
    id: '21', slug: 'coca-cola-zero-200ml', name: 'Refrigerante Coca-Cola Zero 200ml',
    description: 'Coca-Cola zero açúcar, mesmo sabor sem calorias.',
    price: 1.85, unit: 'un',
    image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=400&fit=crop',
    category: 'Refrigerantes', categorySlug: 'refrigerantes',
    department: 'Bebidas', departmentSlug: 'bebidas',
    isOffer: false, isBestSeller: true, isFeatured: false, stock: 60,
    brand: 'Coca-Cola', tags: ['refrigerante', 'zero', 'sem açúcar'],
  },

  // === MERCEARIA ===
  {
    id: '22', slug: 'arroz-tio-joao-5kg', name: 'Arroz Branco Tio João 5kg',
    description: 'Arroz branco tipo 1, grãos selecionados e saborosos.',
    price: 24.90, originalPrice: 29.90, unit: 'un',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop',
    category: 'Arroz e Feijão', categorySlug: 'arroz-feijao',
    department: 'Mercearia', departmentSlug: 'mercearia',
    isOffer: true, discountPercent: 17, isBestSeller: true, isFeatured: true, stock: 80,
    brand: 'Tio João', tags: ['arroz', 'mercearia', 'básico'],
  },
  {
    id: '23', slug: 'feijao-carioca-1kg', name: 'Feijão Carioca Camil 1kg',
    description: 'Feijão carioca tipo 1, grãos uniformes e de rápido cozimento.',
    price: 7.49, originalPrice: 8.99, unit: 'un',
    image: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=400&h=400&fit=crop',
    category: 'Arroz e Feijão', categorySlug: 'arroz-feijao',
    department: 'Mercearia', departmentSlug: 'mercearia',
    isOffer: true, discountPercent: 17, isBestSeller: true, isFeatured: false, stock: 60,
    brand: 'Camil', tags: ['feijão', 'mercearia', 'básico'],
  },
  {
    id: '24', slug: 'macarrao-espaguete-500g', name: 'Macarrão Espaguete Barilla 500g',
    description: 'Macarrão espaguete italiano, feito com trigo duro selecionado.',
    price: 5.99, unit: 'un',
    image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=400&h=400&fit=crop',
    category: 'Massas', categorySlug: 'massas',
    department: 'Mercearia', departmentSlug: 'mercearia',
    isOffer: false, isBestSeller: true, isFeatured: false, stock: 70,
    brand: 'Barilla', tags: ['macarrão', 'massa', 'italiana'],
  },
  {
    id: '25', slug: 'oleo-soja-900ml', name: 'Óleo de Soja Soya 900ml',
    description: 'Óleo de soja refinado, ideal para fritura e culinária em geral.',
    price: 5.49, originalPrice: 6.99, unit: 'un',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop',
    category: 'Óleos e Vinagres', categorySlug: 'oleos-vinagres',
    department: 'Mercearia', departmentSlug: 'mercearia',
    isOffer: true, discountPercent: 21, isBestSeller: true, isFeatured: true, stock: 90,
    brand: 'Soya', tags: ['óleo', 'soja', 'culinária'],
  },
  {
    id: '26', slug: 'acucar-refinado-1kg', name: 'Açúcar Refinado União 1kg',
    description: 'Açúcar refinado de qualidade superior, granulação fina e uniforme.',
    price: 4.29, unit: 'un',
    image: 'https://images.unsplash.com/photo-1581600140682-d4e68c8cde32?w=400&h=400&fit=crop',
    category: 'Açúcar e Sal', categorySlug: 'acucar-sal',
    department: 'Mercearia', departmentSlug: 'mercearia',
    isOffer: false, isBestSeller: true, isFeatured: false, stock: 100,
    brand: 'União', tags: ['açúcar', 'mercearia', 'básico'],
  },
  {
    id: '27', slug: 'cafe-pilao-500g', name: 'Café Torrado e Moído Pilão 500g',
    description: 'Café Pilão forte e encorpado, intensidade 5, para um café com mais sabor.',
    price: 16.99, originalPrice: 19.99, unit: 'un',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop',
    category: 'Condimentos', categorySlug: 'condimentos',
    department: 'Mercearia', departmentSlug: 'mercearia',
    isOffer: true, discountPercent: 15, isBestSeller: true, isFeatured: true, stock: 55,
    brand: 'Pilão', tags: ['café', 'bebida quente', 'pilão'],
  },

  // === LIMPEZA ===
  {
    id: '28', slug: 'detergente-ypê-500ml', name: 'Detergente Neutro Ypê 500ml',
    description: 'Detergente líquido neutro, alta performance na remoção de gorduras.',
    price: 2.29, originalPrice: 2.99, unit: 'un',
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop',
    category: 'Detergentes', categorySlug: 'detergentes',
    department: 'Limpeza', departmentSlug: 'limpeza',
    isOffer: true, discountPercent: 23, isBestSeller: true, isFeatured: false, stock: 150,
    brand: 'Ypê', tags: ['limpeza', 'detergente', 'cozinha'],
  },
  {
    id: '29', slug: 'sabao-po-omo-1kg', name: 'Sabão em Pó OMO Lavanda 1kg',
    description: 'Sabão em pó OMO com aroma de lavanda, remove manchas difíceis.',
    price: 12.99, originalPrice: 15.49, unit: 'un',
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop',
    category: 'Sabão em Pó', categorySlug: 'sabao-po',
    department: 'Limpeza', departmentSlug: 'limpeza',
    isOffer: true, discountPercent: 16, isBestSeller: true, isFeatured: true, stock: 80,
    brand: 'OMO', tags: ['limpeza', 'sabão', 'roupa'],
  },
  {
    id: '30', slug: 'papel-higienico-neve-12', name: 'Papel Higiênico Neve Folha Dupla 12un',
    description: 'Papel higiênico folha dupla, macio e resistente.',
    price: 18.99, originalPrice: 22.99, unit: 'pacote',
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop',
    category: 'Papel Higiênico', categorySlug: 'papel-higienico',
    department: 'Limpeza', departmentSlug: 'limpeza',
    isOffer: true, discountPercent: 17, isBestSeller: true, isFeatured: true, stock: 60,
    brand: 'Neve', tags: ['papel higiênico', 'banheiro', 'limpeza'],
  },

  // === HIGIENE ===
  {
    id: '31', slug: 'shampoo-pantene-400ml', name: 'Shampoo Pantene Restauração 400ml',
    description: 'Shampoo Pantene para cabelos danificados, com proteína de seda.',
    price: 13.99, originalPrice: 17.99, unit: 'un',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop',
    category: 'Shampoo e Condicionador', categorySlug: 'shampoo',
    department: 'Higiene e Beleza', departmentSlug: 'higiene',
    isOffer: true, discountPercent: 22, isBestSeller: true, isFeatured: true, stock: 45,
    brand: 'Pantene', tags: ['shampoo', 'cabelo', 'higiene'],
  },
  {
    id: '32', slug: 'sabonete-dove-90g', name: 'Sabonete Dove Original 90g',
    description: 'Sabonete Dove com 1/4 de creme hidratante, hidrata enquanto limpa.',
    price: 3.49, originalPrice: 4.29, unit: 'un',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop',
    category: 'Sabonetes', categorySlug: 'sabonetes',
    department: 'Higiene e Beleza', departmentSlug: 'higiene',
    isOffer: true, discountPercent: 19, isBestSeller: true, isFeatured: false, stock: 80,
    brand: 'Dove', tags: ['sabonete', 'higiene', 'hidratante'],
  },
  {
    id: '33', slug: 'creme-dental-colgate-90g', name: 'Creme Dental Colgate Total 90g',
    description: 'Creme dental Colgate Total 12, proteção completa por 12 horas.',
    price: 4.99, originalPrice: 5.99, unit: 'un',
    image: 'https://images.unsplash.com/photo-1559682468-a6a29e7d9517?w=400&h=400&fit=crop',
    category: 'Creme Dental', categorySlug: 'creme-dental',
    department: 'Higiene e Beleza', departmentSlug: 'higiene',
    isOffer: true, discountPercent: 17, isBestSeller: false, isFeatured: true, stock: 70,
    brand: 'Colgate', tags: ['dental', 'higiene', 'saúde'],
  },

  // === CONGELADOS ===
  {
    id: '34', slug: 'sorvete-kibon-1-5l', name: 'Sorvete Kibon Creme 1,5L',
    description: 'Sorvete Kibon sabor creme, cremoso e delicioso para toda família.',
    price: 14.99, originalPrice: 18.99, unit: 'un',
    image: 'https://images.unsplash.com/photo-1560008581-09826d1de69e?w=400&h=400&fit=crop',
    category: 'Sorvetes', categorySlug: 'sorvetes',
    department: 'Congelados', departmentSlug: 'congelados',
    isOffer: true, discountPercent: 21, isBestSeller: true, isFeatured: true, stock: 25,
    brand: 'Kibon', tags: ['sorvete', 'congelado', 'sobremesa'],
  },
  {
    id: '35', slug: 'pizza-congelada-sadia-460g', name: 'Pizza Congelada Sadia Mussarela 460g',
    description: 'Pizza congelada Sadia sabor mussarela, massa fina e crocante.',
    price: 18.99, originalPrice: 22.99, unit: 'un',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop',
    category: 'Pizzas e Pratos Prontos', categorySlug: 'pizzas-pratos',
    department: 'Congelados', departmentSlug: 'congelados',
    isOffer: true, discountPercent: 17, isBestSeller: false, isFeatured: true, stock: 20,
    brand: 'Sadia', tags: ['pizza', 'congelado', 'prático'],
  },

  // === SNACKS ===
  {
    id: '36', slug: 'biscoito-oreo-144g', name: 'Biscoito Oreo Original 144g',
    description: 'Biscoito Oreo recheado com creme baunilha, clássico irresistível.',
    price: 5.99, originalPrice: 7.49, unit: 'un',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop',
    category: 'Biscoitos', categorySlug: 'biscoitos',
    department: 'Snacks e Doces', departmentSlug: 'snacks',
    isOffer: true, discountPercent: 20, isBestSeller: true, isFeatured: true, stock: 90,
    brand: 'Oreo', tags: ['biscoito', 'snack', 'doce'],
  },
  {
    id: '37', slug: 'chocolate-lacta-80g', name: 'Chocolate Lacta Ao Leite 80g',
    description: 'Chocolate ao leite Lacta, cremoso e saboroso, feito no Brasil.',
    price: 4.49, originalPrice: 5.49, unit: 'un',
    image: 'https://images.unsplash.com/photo-1481391243133-f96216dcb5d2?w=400&h=400&fit=crop',
    category: 'Chocolates', categorySlug: 'chocolates',
    department: 'Snacks e Doces', departmentSlug: 'snacks',
    isOffer: true, discountPercent: 18, isBestSeller: true, isFeatured: false, stock: 100,
    brand: 'Lacta', tags: ['chocolate', 'doce', 'snack'],
  },
  {
    id: '38', slug: 'salgadinho-ruffles-96g', name: 'Salgadinho Ruffles Cheddar 96g',
    description: 'Salgadinho Ruffles sabor cheddar, crocante e irresistível.',
    price: 6.99, originalPrice: 8.49, unit: 'un',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=400&fit=crop',
    category: 'Salgadinhos', categorySlug: 'salgadinhos',
    department: 'Snacks e Doces', departmentSlug: 'snacks',
    isOffer: true, discountPercent: 18, isBestSeller: true, isFeatured: true, stock: 75,
    brand: 'Ruffles', tags: ['salgadinho', 'snack', 'petisco'],
  },
  {
    id: '39', slug: 'bala-mentos-35g', name: 'Bala Mentos Frutas 35g',
    description: 'Balas Mentos sabor frutas, frescas e saborosas.',
    price: 2.99, unit: 'un',
    image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400&h=400&fit=crop',
    category: 'Balas e Gomas', categorySlug: 'balas-gomas',
    department: 'Snacks e Doces', departmentSlug: 'snacks',
    isOffer: false, isBestSeller: false, isFeatured: false, stock: 200,
    brand: 'Mentos', tags: ['bala', 'doce', 'snack'],
  },

  // === PADARIA ===
  {
    id: '40', slug: 'pao-de-forma-pullman-500g', name: 'Pão de Forma Pullman Tradicional 500g',
    description: 'Pão de forma macio e fresquinho, ideal para sanduíches e torradas.',
    price: 6.99, originalPrice: 8.49, unit: 'un',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop',
    category: 'Pães', categorySlug: 'paes',
    department: 'Padaria', departmentSlug: 'padaria',
    isOffer: true, discountPercent: 18, isBestSeller: true, isFeatured: true, stock: 40,
    brand: 'Pullman', tags: ['pão', 'padaria', 'sanduíche'],
  },
]

export function getProductsByDepartment(departmentSlug: string): Product[] {
  return products.filter(p => p.departmentSlug === departmentSlug)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter(p => p.categorySlug === categorySlug)
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.isFeatured)
}

export function getBestSellers(): Product[] {
  return products.filter(p => p.isBestSeller)
}

export function getOffers(): Product[] {
  return products.filter(p => p.isOffer)
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase()
  return products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.brand?.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.tags.some(t => t.includes(q))
  )
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}
