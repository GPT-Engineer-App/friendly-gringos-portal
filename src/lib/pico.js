import { toast } from "sonner";

const PICO_API_KEY = import.meta.env.VITE_PICO_API_KEY;

export const generateImage = async (prompt) => {
  try {
    const response = await fetch('https://api.pico.tools/v1/collections/default/images', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PICO_API_KEY}`
      },
      body: JSON.stringify({
        prompt: prompt,
        style: 'realistic',
        width: 512,
        height: 512,
        steps: 50,
        cfg_scale: 7,
        batch_size: 1,
        seed: Math.floor(Math.random() * 1000000)
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.images && data.images.length > 0) {
      return data.images[0].url;
    } else {
      throw new Error('No image generated');
    }
  } catch (error) {
    console.error('Error generating image:', error);
    toast.error('Failed to generate image');
    throw error;
  }
};
