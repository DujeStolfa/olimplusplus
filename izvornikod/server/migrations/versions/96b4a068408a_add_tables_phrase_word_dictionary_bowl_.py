"""Add tables PHRASE, WORD_DICTIONARY, BOWL, WORD_STATE.

Revision ID: 96b4a068408a
Revises: f213c8eb2e84
Create Date: 2024-01-05 12:13:11.746227

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '96b4a068408a'
down_revision = 'f213c8eb2e84'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('bowl',
    sa.Column('bowlid', sa.Integer(), nullable=False),
    sa.Column('interval', postgresql.INTERVAL(), nullable=False),
    sa.PrimaryKeyConstraint('bowlid')
    )
    op.create_table('phrase',
    sa.Column('phraseid', sa.Integer(), nullable=False),
    sa.Column('phrase', sa.String(length=256), nullable=False),
    sa.Column('wordid', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['wordid'], ['word.wordid'], ),
    sa.PrimaryKeyConstraint('phraseid')
    )
    op.create_table('word_dictionary',
    sa.Column('wordid', sa.Integer(), nullable=False),
    sa.Column('dictionaryid', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['dictionaryid'], ['dictionary.dictionaryid'], ),
    sa.ForeignKeyConstraint(['wordid'], ['word.wordid'], ),
    sa.PrimaryKeyConstraint('wordid', 'dictionaryid')
    )
    op.create_table('word_state',
    sa.Column('userid', sa.Integer(), nullable=False),
    sa.Column('wordid', sa.Integer(), nullable=False),
    sa.Column('bowlid', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['bowlid'], ['bowl.bowlid'], ),
    sa.ForeignKeyConstraint(['userid'], ['user.userid'], ),
    sa.ForeignKeyConstraint(['wordid'], ['word.wordid'], ),
    sa.PrimaryKeyConstraint('userid', 'wordid')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('word_state')
    op.drop_table('word_dictionary')
    op.drop_table('phrase')
    op.drop_table('bowl')
    # ### end Alembic commands ###
