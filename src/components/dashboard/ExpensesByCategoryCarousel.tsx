import { useRef, useState, useEffect } from 'react'
import { useFinance } from '../../hooks/useFinance'
import { CategoryDonutCard } from './CategoryDonutCard'
import { ArrowLeftIcon } from './icons/ArrowLeftIcon'
import { ArrowRightIcon } from './icons/ArrowRightIcon'

// Array de cores que rota para as categorias
const categoryColors = [
  'var(--color-brand-600, #D7FE03)', // Verde-limão
  'var(--color-neutral-1000, #111827)', // Preto
  'var(--color-neutral-600, #6B7280)', // Cinza médio
  'var(--color-purple-600, #903CF5)', // Roxo
  'var(--color-blue-600, #2A89EF)', // Azul
  'var(--color-green-600, #15BE78)', // Verde
]

export function ExpensesByCategoryCarousel() {
  const { calculateExpensesByCategory, calculateCategoryPercentage } = useFinance()
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const expensesByCategory = calculateExpensesByCategory()

  // Verificar se pode fazer scroll
  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  useEffect(() => {
    checkScrollability()
    const carousel = carouselRef.current
    if (carousel) {
      carousel.addEventListener('scroll', checkScrollability)
      return () => carousel.removeEventListener('scroll', checkScrollability)
    }
  }, [expensesByCategory])

  // Navegação por setas
  const scrollLeftHandler = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -200, behavior: 'smooth' })
    }
  }

  const scrollRightHandler = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 200, behavior: 'smooth' })
    }
  }

  // Navegação por mouse wheel (horizontal)
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (carouselRef.current && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault()
      carouselRef.current.scrollLeft += e.deltaY
    }
  }

  // Drag para scroll
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (carouselRef.current) {
      setIsDragging(true)
      setStartX(e.pageX - carouselRef.current.offsetLeft)
      setScrollLeft(carouselRef.current.scrollLeft)
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !carouselRef.current) return
    e.preventDefault()
    const x = e.pageX - carouselRef.current.offsetLeft
    const walk = (x - startX) * 2 // Velocidade do scroll
    carouselRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  return (
    <div className="relative w-full" style={{ maxWidth: '100%', boxSizing: 'border-box' }}>
      {/* Container do carrossel */}
      <div
        ref={carouselRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          handleMouseLeave()
        }}
        className="
          flex
          overflow-x-auto
          scrollbar-hide
          gap-3
          pb-4
          cursor-grab
          active:cursor-grabbing
        "
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          alignSelf: 'stretch',
          maxWidth: '100%',
          boxSizing: 'border-box',
          // Gradiente de máscara nas bordas
          maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
        }}
      >
        {expensesByCategory.map((item, index) => {
          const percentage = calculateCategoryPercentage(item.category)
          const color = categoryColors[index % categoryColors.length]

          return (
            <CategoryDonutCard
              key={item.category}
              category={item.category}
              amount={item.amount}
              percentage={percentage}
              color={color}
            />
          )
        })}
      </div>

      {/* Setas de navegação (apenas desktop e quando hover) */}
      {isHovered && (
        <>
          {canScrollLeft && (
            <button
              onClick={scrollLeftHandler}
              className="
                hidden lg:flex
                absolute left-0 top-1/2 -translate-y-1/2
                w-10 h-10
                rounded-full
                bg-neutral-0
                shadow-lg
                items-center justify-center
                text-neutral-600
                hover:bg-neutral-100
                transition-colors
                z-10
              "
              aria-label="Scroll left"
            >
              <ArrowLeftIcon />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={scrollRightHandler}
              className="
                hidden lg:flex
                absolute right-0 top-1/2 -translate-y-1/2
                w-10 h-10
                rounded-full
                bg-neutral-0
                shadow-lg
                items-center justify-center
                text-neutral-600
                hover:bg-neutral-100
                transition-colors
                z-10
              "
              aria-label="Scroll right"
            >
              <ArrowRightIcon />
            </button>
          )}
        </>
      )}
    </div>
  )
}
