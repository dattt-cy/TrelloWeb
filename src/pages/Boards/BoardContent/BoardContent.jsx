import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import { cloneDeep } from 'lodash'
import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {
  //Yeu cau chuot di chuyen 10px thi moi kich hoat event, fix truong hop click bi goi event
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 15 }
  })

  // const pointerSensor = useSensor(PointerSensor, {
  //   activationConstraint: { distance: 10 }
  // })

  //Nhan giu 250ms va dung sai cam ung(de hieu la di chuyen/chenh lech 5px) thi moi kich hoat event
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 5 }
  })
  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])
  //Cung mot thoi diem chi co mot phan tu dang dc keo column hoac card
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])
  // Tim mot column theo cardId
  const findColumnByCardId = (cardId) => {
    //Doan nay luu y, neu dung c.cards thay vi c.cardOrderIds boi vi o buoc handleDraOver
    // chung ta se lam du lieu cho card hoan chinh truoc roi moi tao cardOrderIs moi
    return orderedColumns.find((column) =>
      column?.cards?.map((card) => card._id)?.includes(cardId)
    )
  }
  //Trigger khi ket thuc hanh dong keo mot phan tu
  const handleDragEnd = (event) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      return
    }
    const { active, over } = event
    //keo linh tinh ra ngoai thi return
    // Dam bao neu khong ton tai active hoac over (khi keo ra khoi pham vi container) thi khong lam gi tranh crash trang
    if (!over || !active) return
    //Neu vi tri sau khi keo tha khac voi vi tri ban dau
    if (active.id !== over.id) {
      //Lay vi  tri cu tu active
      const oldIndex = orderedColumns.findIndex((c) => c._id === active.id)
      //Lay vi tri moi tu over
      const newIndex = orderedColumns.findIndex((c) => c._id === over.id)

      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)

      //Cap nhat lai stateColumns ban dau sau khi da keo tha
      setOrderedColumns(dndOrderedColumns)
    }
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }
  //Trigger trong qua trinh keo mot phan tu
  const handleDragOver = (event) => {
    // Neu la column khong lam gi ca
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    // COn neu keo card thi xu li them khi keo card qua cac column khac
    const { active, over } = event
    // Dam bao neu khong ton tai active hoac over (khi keo ra khoi pham vi container) thi khong lam gi tranh crash trang
    if (!over || !active) return

    // AciveDraggingCard: la cai card dang duoc keo
    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData }
    } = active
    // overCard: la cai card dang tuong tac tren hoac duoi so voi cai card duoc keo o tren
    const { id: overCardId } = over
    // Tim 2 cai columns theo cardId
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)
    // Neu khong ton tai 1 trong 2 column thi khong lam gi het
    if (!activeColumn || !overColumn) return
    // Xu li logic o day chi khi keo qua 2 column khac nhau, con neu keo card trong chinh column ban dau thi khong lam gi
    // Vi day dang la doan xu li luc keo (handleDragOver), con xu ly luc keo xong xuoi thi no lai van de khac (handleDragEnd)
    if (activeColumn._id !== overColumn._id) {
      // Tim vi tri index cua cai overCard trong column dich ( noi ma activeCard sap duoc tha )
      setOrderedColumns((prevColumns) => {
        const overCardIndex = overColumn?.cards?.findIndex(
          (card) => card._id === overCardId
        )
        let newCardIndex
        const isBellowOverIcon =
          active.rect.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height
        const modifier = isBellowOverIcon ? 1 : 0
        newCardIndex =
          overCardIndex >= 0
            ? overCardIndex + modifier
            : overColumn?.cards?.length + 1
        // Clone mang OrderedColumnsState cu ra mot cai moi de xu li data roi return cap nhat lai OrderedColumnState moi
        const nextColumns = cloneDeep(prevColumns)
        const nextActiveColumn = nextColumns.find(
          (column) => column._id === activeColumn._id
        )
        const nextOverColumn = nextColumns.find(
          (column) => column._id === overColumn._id
        )
        if (nextActiveColumn) {
          // Xoa card o cai column active (cung co the hieu la column cu), cai luc ma keo card ra khoi no de sang column khac
          nextActiveColumn.cards = nextActiveColumn.cards.filter(
            (card) => card._id !== activeDraggingCardId
          )
          // Cap nhat lai mang cardOrderIs cho chuan du lieu
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
            (card) => card._id
          )
        }
        //Column
        if (nextOverColumn) {
          //Kiem tra xem card dang keo no co ton tai o overColumn chua, neu thi xoa no truoc
          nextOverColumn.cards = nextOverColumn.cards.filter(
            (card) => card._id !== activeDraggingCardId
          )
          //Tiep theo la them cai card dang keo vao overColumn vao vi tri index moi
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(
            newCardIndex,
            0,
            activeDraggingCardData
          )
          // Cap nhat lai mang cardOrderIs cho chuan du lieu
          nextOverColumn.cardOrderIds = nextActiveColumn.cards.map(
            (card) => card._id
          )
        }
        return nextColumns
      })
    }
  }
  //Trigger khi bat dau keo mot phan tu
  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    )
    setActiveDragItemData(event?.active?.data?.current)
  }

  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    }),
    // Giảm duration để animation mượt hơn
    duration: 150
  }

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      sensors={sensors}
    >
      <Box
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
          width: '100%',
          height: (theme) => theme.trello.boardContentHeight,
          p: '10px 0'
        }}
      >
        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <Column column={activeDragItemData} />
          )}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
            <Card card={activeDragItemData} />
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
