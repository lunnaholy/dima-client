export function TranslationIcon({ onClick, svg }: { onClick: () => void, svg: any }) {
  return (
    <div
      onClick={onClick}
      className="w-8 h-8 cursor-pointer overflow-hidden shadow-sm rounded-full bg-white"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}