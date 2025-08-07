-- Update products to focus on clothing and feminine fashion
-- Replace existing products with clothing-focused items using professional fashion images

-- Clear existing products
DELETE FROM public.products;

-- Insert new clothing-focused products with professional fashion images
INSERT INTO public.products (name, description, price, stock, image_url, category, sku) VALUES
('Elegant Blush Blazer', 'A sophisticated blazer crafted with premium fabrics, perfect for professional and casual settings.', 130.83, 198, 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Clothing', 'EBB001'),
('Chic Midi Dress', 'Elegant midi dress with flowing silhouette, designed for the modern feminine wardrobe.', 89.99, 156, 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Clothing', 'CMD002'),
('Soft Cashmere Sweater', 'Luxurious cashmere sweater in rose pink, offering comfort and timeless style.', 145.50, 87, 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Clothing', 'SCS003'),
('Floral Summer Blouse', 'Light and airy blouse with delicate floral patterns, perfect for spring and summer styling.', 65.42, 234, 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Clothing', 'FSB004'),
('Vintage Denim Jacket', 'Classic denim jacket with modern tailoring and vintage-inspired details for effortless style.', 98.75, 143, 'https://images.unsplash.com/photo-1544441893-675973e31985?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Clothing', 'VDJ005'),
('Feminine Silk Scarf', 'Delicate silk scarf in soft pastels, the perfect accessory to elevate any outfit.', 32.99, 298, 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Accessories', 'FSS006'),
('High-Waisted Trousers', 'Tailored high-waisted trousers in blush pink, combining comfort with sophisticated style.', 78.25, 167, 'https://images.unsplash.com/photo-1506629905057-f39adf5a0683?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Clothing', 'HWT007'),
('Romantic Lace Top', 'Delicate lace top in cream, perfect for layering or wearing alone for special occasions.', 54.90, 189, 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Clothing', 'RLT008'),
('Cozy Knit Cardigan', 'Soft knit cardigan in dusty rose, perfect for layering and creating cozy, chic looks.', 72.80, 201, 'https://images.unsplash.com/photo-1583743089695-4b816a340f82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Clothing', 'CKC009'),
('Pleated Maxi Skirt', 'Flowing pleated maxi skirt in soft blush, designed for graceful movement and feminine elegance.', 67.99, 178, 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Clothing', 'PMS010');
