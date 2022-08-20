import { useState } from 'react'
import { useDispatch } from 'react-redux' 
import { updateGoal, deleteGoal } from '../features/goals/goalSlice'
import { FaEdit, FaTimesCircle, FaSave } from 'react-icons/fa'

const GoalItem = ({ goal }) => {
  const [text, setText] = useState(goal.text)
  const [showEditForm, setShowEditForm] = useState(false)

  const dispatch = useDispatch()

  const onUpdateGoal = () => {
    if(text.trim() === '') return 

    dispatch(updateGoal({ id: goal._id, text }))
  }

  const onDeleteGoal = () => {
    dispatch(deleteGoal(goal._id))
  }

  return (
    <div className='goal'>
      <div>{ new Date(goal.updatedAt).toLocaleString('en-US')}</div>
      {showEditForm ? (
        <form className='goal-edit-form' onSubmit={e => e.preventDefault()}>
          <div className='form-group'>
            <input 
              type='text' 
              name='text'
              id='text'
              placeholder='Enter goal text'
              value={text}
              onChange={e => setText(e.target.value)}
            />
          </div>
          <button type='button' className='goal-save-icon' onClick={onUpdateGoal}>
            <FaSave size={25}/>
          </button>
          <button type='button' className='goal-skip-save-icon' onClick={() => setShowEditForm(prevState => !prevState)}>
            <FaTimesCircle size={25}/>
          </button>
        </form>
      ) : (
        <div className='goal-text-wrapper'>
          <h2 className='goal-text'>{ goal.text }</h2>
          <button className='goal-edit-icon' onClick={() => setShowEditForm(prevState => !prevState)}>
            <FaEdit size={25}/>
          </button> 
        </div>
      )}
      <button className='close' onClick={onDeleteGoal}>
        X
      </button>
    </div>
  )
}

export default GoalItem