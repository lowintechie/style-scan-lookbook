-- Create products table for the digital menu system
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  image_url TEXT,
  category TEXT NOT NULL,
  sku TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create admin_users table for admin authentication
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Products policies (public read access for digital menu)
CREATE POLICY "Anyone can view products" 
ON public.products 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can insert products" 
ON public.products 
FOR INSERT 
WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()));

CREATE POLICY "Only admins can update products" 
ON public.products 
FOR UPDATE 
USING (EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()));

CREATE POLICY "Only admins can delete products" 
ON public.products 
FOR DELETE 
USING (EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()));

-- Admin users policies
CREATE POLICY "Admins can view admin users" 
ON public.admin_users 
FOR SELECT 
USING (EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()));

CREATE POLICY "Only existing admins can create new admins" 
ON public.admin_users 
FOR INSERT 
WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample products data
INSERT INTO public.products (name, description, price, stock, image_url, category, sku) VALUES
('StyleScan Tech Jacket', 'Crafted with stretchy, breathable material, the perfect modern jacket for any occasion.', 130.83, 198, '/src/assets/product-jacket.jpg', 'Clothing', 'SSJ001'),
('Urban Waffle Debut', 'Retro gets modernized in this Urban Waffle Debut. Remember that smooth comfort.', 80.00, 218, '/src/assets/product-sneakers.jpg', 'Shoes', 'UWD002'),
('Elite Crew Basketball Socks', 'The Elite Crew Basketball Socks offer a supportive fit and feel perfect for any activity.', 16.50, 123, '/src/assets/product-socks.jpg', 'Others Product', 'ECBS003'),
('P-6000 Running Shoes', 'The P-6000 draws on the 2006 Air Pegasus, bringing forward iconic design elements.', 115.28, 121, '/src/assets/product-running.jpg', 'Shoes', 'P6RS004'),
('Zoom Vomero Roam', 'Designed for city conditions, this winterized version offers superior comfort and style.', 187.43, 119, '/src/assets/product-retro.jpg', 'Shoes', 'ZVR005'),
('Men''s Fleece Cargo Pants', 'Clean meets casual with these brushed fleece cargo pants that offer comfort and style.', 65.42, 192, '/src/assets/product-pants.jpg', 'Clothing', 'MFCP006');