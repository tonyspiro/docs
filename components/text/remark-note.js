import React from 'react'
import cn from 'classnames'
import PropTypes from 'prop-types'

import Text from '~/components/text'
import withType from '~/lib/with-type'

const Note = ({
  children,
  className,
  type = 'default',
  fill,
  label,
  small,
  center,
  ...props
}) => {
  return (
    <div className={cn('note', className, { small, fill, center })} {...props}>
      {label !== false && (
        <section className="label">
          <Text bold span uppercase>
            {(label && `${label}: `) ||
              (type === 'success' && `Success: `) ||
              (type === 'error' && `Error: `) ||
              (type === 'warning' && `Warning: `) ||
              `Note: `}
          </Text>
        </section>
      )}

      <section className="content">{children}</section>

      <style jsx>{`
        .note {
          background: var(--themed-bg);

          font-size: 16px;
          line-height: 1.8;
          color: var(--themed-fg);
          border-radius: var(--geist-radius);
        }

        .note .label {
          background: var(--themed-fg);
          color: var(--themed-bg);
          font-size: 0.85rem;
          border-radius: var(--geist-radius) var(--geist-radius) 0 0;

          padding: ${small
            ? 'var(--geist-gap-quarter) var(--geist-gap-half)'
            : 'var(--geist-gap-half) var(--geist-gap)'};

          padding-top: 0.3rem;
          padding-bottom: 0.2rem;
        }

        .note .content {
          padding: ${small
            ? 'var(--geist-gap-quarter) var(--geist-gap-half)'
            : 'var(--geist-gap-half) var(--geist-gap)'};

          border: 1px solid var(--themed-border);
          border-top: 0;
        }

        .note:not(.geist-themed) {
          --themed-border: var(--accents-2);
        }

        .note.fill:not(.geist-themed) {
          --themed-bg: var(--geist-foreground);
          --themed-fg: var(--geist-background);
          --themed-border: var(--geist-foreground);
        }

        .note__type {
          text-transform: uppercase;
          font-weight: 500;
        }

        .note.small .content,
        .note.small .label {
          padding: 5px var(--geist-gap-half);
        }

        .note.center {
          text-align: center;
        }
      `}</style>
    </div>
  )
}

Note.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  hideLabel: PropTypes.bool,
  type: PropTypes.oneOf([
    'secondary',
    'success',
    'error',
    'warning',
    'default',
    'lite'
  ]),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
}

export default withType(Note)
