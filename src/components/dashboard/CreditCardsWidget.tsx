import { FC, useState } from 'react'
import { useFinance } from '../../hooks/useFinance'
import { CreditCard } from '../../types/creditCard'
import { CreditCardIcon } from './icons/CreditCardIcon'
import { PlusIcon } from './icons/PlusIcon'
import { CreditCardItem } from './CreditCardItem'

const CARDS_PER_PAGE = 3

export const CreditCardsWidget: FC = () => {
  const { creditCards } = useFinance()
  const [currentPage, setCurrentPage] = useState(0)

  const totalPages = Math.ceil(creditCards.length / CARDS_PER_PAGE)
  const startIndex = currentPage * CARDS_PER_PAGE
  const endIndex = startIndex + CARDS_PER_PAGE
  const displayedCards = creditCards.slice(startIndex, endIndex)

  const handleCardClick = (card: CreditCard) => {
    // TODO: Abrir modal de detalhes do cartão (PROMPT 15)
    console.log('Card clicked:', card)
  }

  const handleAddCard = () => {
    // TODO: Abrir modal de adicionar cartão (PROMPT 14)
    console.log('Add card clicked')
  }

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
  }

  return (
    <div
      className="flex flex-col items-start rounded-[16px] bg-neutral-0"
      style={{
        display: 'flex',
        padding: '32px',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '32px',
        flex: '1 0 0',
        alignSelf: 'stretch',
        borderRadius: '16px',
        background: 'var(--color-neutral-0, #FEFEFE)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        {/* Título com ícone */}
        <div className="flex items-center gap-3">
          <div className="text-neutral-1000">
            <CreditCardIcon />
          </div>
          <h2
            className="text-xl font-semibold text-neutral-1000"
            style={{
              fontSize: '20px',
              lineHeight: '28px',
              fontWeight: 600,
            }}
          >
            Cartões
          </h2>
        </div>

        {/* Botão adicionar */}
        <button
          onClick={handleAddCard}
          className="
            w-10 h-10
            rounded-lg
            bg-neutral-0
            border border-neutral-300
            flex items-center justify-center
            text-neutral-600
            hover:bg-neutral-100
            transition-colors duration-200
          "
          aria-label="Adicionar cartão"
        >
          <PlusIcon />
        </button>
      </div>

      {/* Lista de cartões */}
      {creditCards.length === 0 ? (
        <div className="w-full py-8 text-center">
          <p className="text-neutral-500 text-sm">Nenhum cartão cadastrado</p>
        </div>
      ) : (
        <>
          <div className="w-full flex flex-col gap-3">
            {displayedCards.map((card) => (
              <CreditCardItem key={card.id} card={card} onClick={() => handleCardClick(card)} />
            ))}
          </div>

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 w-full">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 0}
                className="
                  px-3 py-1.5
                  rounded-lg
                  text-sm font-medium
                  transition-colors duration-200
                  disabled:opacity-50 disabled:cursor-not-allowed
                  bg-neutral-200 text-neutral-600
                  hover:bg-neutral-300
                "
                aria-label="Página anterior"
              >
                Anterior
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`
                      w-8 h-8
                      rounded-lg
                      text-sm font-medium
                      transition-colors duration-200
                      ${
                        i === currentPage
                          ? 'bg-neutral-1000 text-neutral-0'
                          : 'bg-neutral-200 text-neutral-600 hover:bg-neutral-300'
                      }
                    `}
                    aria-label={`Página ${i + 1}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages - 1}
                className="
                  px-3 py-1.5
                  rounded-lg
                  text-sm font-medium
                  transition-colors duration-200
                  disabled:opacity-50 disabled:cursor-not-allowed
                  bg-neutral-200 text-neutral-600
                  hover:bg-neutral-300
                "
                aria-label="Próxima página"
              >
                Próxima
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
