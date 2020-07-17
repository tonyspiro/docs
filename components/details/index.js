import React, { useRef, useEffect } from 'react'
import cn from 'classnames'

import { AnimatedDiv } from './animated-container'

import styles from './details.module.css'

function Details({ title, children, className, onClick, ...props }) {
  const animate = useRef(false)

  useEffect(() => {
    animate.current = true
  }, [])

  return (
    <AnimatedDiv
      tension={290}
      friction={30}
      initialHeight="auto"
      immediate={!animate.current}
    >
      <details className={cn(styles.details, className)} {...props}>
        <summary
          onClick={e => {
            if (onClick) {
              e.preventDefault()
              onClick(e)
            }
          }}
        >
          {title}
        </summary>
        {children}
      </details>
    </AnimatedDiv>
  )
}

export default React.memo(Details)
