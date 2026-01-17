import React from 'react'
import '../styles/components/categories.sass'

function Categories() {
  return (
    <div id="categories">
        <ul className='dropdown'>
            <li className="category-item" id="0">Todos</li>                           
            <li className="category-item" id="3">Pendentes</li>
            <li className="category-item" id="1">Aprovados</li>
            <li className="category-item" id="2">Reprovados</li>
        </ul>
    </div>
  )
}

export default Categories