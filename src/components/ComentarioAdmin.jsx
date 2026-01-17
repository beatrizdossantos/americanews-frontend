import React from 'react'
import '../styles/components/comentarioAdmin.sass'
import NoticiaImagem1 from '../img/Jailson_Mendes.jpg';
import NoticiaImagem2 from '../img/Imposto_Renda.jpg';
import NoticiaImagem3 from '../img/Shrek.jpg';
import NoticiaImagem4 from '../img/WhatHell.jpg';

function Comentario() {
  return (
    <div id="comentario">
        <div id='comentarioScroll'>
                <div id='comentarios'>
                    <div className='comentarioItem'>
                        <img className='imageUserComentario' src={NoticiaImagem3} alt='Noticia 1'></img>
                        <div className='corpoComentario'>
                            <h3 className='usuarioIdentificacao'>Biro Biro</h3>
                            <p className='textoComentario'>Esse Alan é um fanfarrão, acho que devia jogar mais pois gameplay ta ruim.</p>
                            <input type='date' className='dataDoComentario' name='dataDoComentario' disabled value="2024-01-02"></input>
                        </div>
                    </div>
                    <div className='comentarioItem'>
                        <img className='imageUserComentario' src={NoticiaImagem1} alt='Noticia 1'></img>
                        <div>
                            <h3 className='usuarioIdentificacao'>Imperatriz Panda</h3>
                            <p className='textoComentario'>Esse meu comentário será o maior pois eu quero me aparecer e testar a funcionalidade pois os dev estão muito preguiçosos
                                e como eu adoro irritar, vou causar vários bugs assim eles param de fazer corpo mole e assim fazem por merecer o salário minimo que recebem hua ha ha ha ha eu sou MÁ, eu sou RICAAAAAAAAAA</p>
                            <input type='date' className='dataDoComentario' name='dataDoComentario' disabled value="2024-01-03"></input>
                        </div>
                    </div>
                    <div className='comentarioItem'>
                        <img className='imageUserComentario' src={NoticiaImagem4} alt='Noticia 1'></img>
                        <div>
                            <h3 className='usuarioIdentificacao'>Luizera</h3>
                            <p className='textoComentario'>QUERO CAFÉÉÉÉÉÉ!!"</p>
                            {/* <p className='dataDaNoticia'>28/05/2024</p>  */}
                            <input type='date' className='dataDoComentario' name='dataDoComentario' disabled value="2024-01-01"></input>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Comentario


// import React from 'react'

// function Comentario() {
//     return (
//         <div id="comentario">
//             <h1 className="comentario_title">Comentários</h1>
//         </div>
//         <div id='comentarioScroll'>
//         <div id='comentarios'>

//         {comentarios.length > 0 ? (
//             comentarios.map((comentario, index) => ( 
//             <div className='comentarioItem'>
//                 <div>
//                     <h3 className='usuarioIdentificacao'>Imperatriz Panda</h3>
//                     <p className='textoComentario'>Esse meu comentário será o maior pois eu quero me aparecer e testar a funcionalidade pois os dev estão muito preguiçosos
//                         e como eu adoro irritar, vou causar vários bugs assim eles param de fazer corpo mole e assim fazem por merecer o salário minimo que recebem hua ha ha ha ha eu sou MÁ, eu sou RICAAAAAAAAAA</p>
//                     <input type='date' className='dataDoComentario' name='dataDoComentario' min={dataAtual} disabled value="2024-01-03"></input>
//                 </div>
//             </div>

//         ))
//         ) : (
//             <div className='noticiaItem'>
//                 <p>Não há notícias nesse status.</p>
//             </div>
//         )}

//         </div>
//         <div id='escreverComentario'>
//             <div className='comentarioCampo'>
//                 <div className='corpoComentario'>
//                     <textarea className='textoComentarioEscrito' placeholder='Escreve algo meu consagrado se não o RH vai te chamar mais tarde!'></textarea>
//                 </div>
//                 <div>
//                     <button className='enviarComentario'>
//                         <h1>Enviar</h1>
//                     </button>
//                 </div>
//             </div>
//         </div>
//         </div>
//             </div >
//     )
// }

// export default Comentario