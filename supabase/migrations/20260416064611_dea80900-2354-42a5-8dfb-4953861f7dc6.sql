
DROP POLICY "Anyone can send messages" ON public.messages;
CREATE POLICY "Anyone can send messages with valid data" ON public.messages FOR INSERT WITH CHECK (sender_name IS NOT NULL AND sender_name != '' AND message IS NOT NULL AND message != '');
