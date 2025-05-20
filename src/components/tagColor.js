  const tailwindColors = [
    'bg-red-200 text-red-500',
    'bg-orange-200 text-orange-500',
    'bg-amber-200 text-amber-500',
    'bg-yellow-200 text-yellow-500',
    'bg-lime-200 text-lime-500',
    'bg-green-200 text-green-500',
    'bg-emerald-200 text-emerald-500',
    'bg-teal-200 text-teal-500',
    'bg-cyan-200 text-cyan-500',
    'bg-blue-200 text-blue-500',
    'bg-indigo-200 text-indigo-500',
    'bg-violet-200 text-violet-500',
    'bg-purple-200 text-purple-500',
    'bg-pink-200 text-pink-500',
    'bg-rose-200 text-rose-500',
  ];
  export const getTagColorClass = (tag) => {
    if (!tag) return 'bg-gray-500';
    let hash = 0;
    for (let i = 0; i < tag.length; i++) {
      hash = tag.charCodeAt(i) + ((hash << 5) - hash);
      tag.charCodeAt(i);
      hash |=0;
    }
    const index = Math.abs(hash) % tailwindColors.length;
    return tailwindColors[index];
  };
