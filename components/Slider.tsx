// Use client
"use client";

import * as RadixSlider from "@radix-ui/react-slider"; // Import RadixSlider components from @radix-ui/react-slider

interface SliderProps {
  value?: number; // Value of the slider
  onChange?: (value: number) => void; // Function to handle slider value change
}

/**
 * Slider Component
 * @param {SliderProps} props - The props for the Slider component.
 * @returns {JSX.Element} - The rendered Slider component.
 */
const Slider: React.FC<SliderProps> = ({ value = 1, onChange }) => {
  // Function to handle slider value change
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

  return (
    <RadixSlider.Root
      className="relative flex items-center select-none touch-none w-full h-10"
      defaultValue={[1]}
      onValueChange={handleChange}
      max={1}
      step={0.1}
      aria-label="volume"
    >
      <RadixSlider.Track className="bg-neutral-600 relative grow rounded-full h-[3px]">
        <RadixSlider.Range className="absolute bg-white rounded-full h-full" />
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
};

export default Slider; // Export Slider component
