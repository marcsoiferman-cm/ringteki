describe('Daidoji Uji', function() {
    integration(function() {
        describe('Daidoji Uji\'s ability', function() {
            beforeEach(function() {
                this.setupTest({
                    phase: 'dynasty',
                    player1: {
                        inPlay: ['daidoji-uji'],
                        dynastyDiscard: ['doji-whisperer','kakita-kaezin'],
                        hand: ['political-rival','way-of-the-crane'],
                        fate: 10
                    },
                    player2: {
                        inPlay: ['utaku-tetsuko','akodo-toturi-2']
                    }
                });

                this.dojiWhisperer = this.player1.placeCardInProvince('doji-whisperer','province 1');
                this.kakitaKaezin = this.player1.placeCardInProvince('kakita-kaezin','province 2');
                this.daidojiUji = this.player1.findCardByName('daidoji-uji');
                this.politicalRival = this.player1.findCardByName('political-rival');
                this.wayOfTheCrane = this.player1.findCardByName('way-of-the-crane');

                this.utakuTetsuko = this.player2.findCardByName('utaku-tetsuko');
                this.akodoToturi2 = this.player2.findCardByName('akodo-toturi-2');
                this.daidojiUji.honor();
            });

            it('should not let you play characters in hand during the dynasty phase', function() {
                this.player1.clickCard(this.politicalRival);
                expect(this.player1).not.toHavePrompt('Choose additional fate');
            });

            it('should not discount the characters played from province during the dynasty phase', function() {
                this.player1.clickCard(this.dojiWhisperer);
                this.player1.clickPrompt('0');
                expect(this.dojiWhisperer.location).toBe('play area');
                expect(this.player1.fate).toBe(9);
            });

            it('let you play characters as if they were in your hand, reducing their cost by 1', function() {
                this.nextPhase();
                this.nextPhase();
                expect(this.game.currentPhase).toBe('conflict');
                this.player1.clickCard(this.dojiWhisperer);
                this.player1.clickPrompt('0');
                expect(this.dojiWhisperer.location).toBe('play area');
                expect(this.player1.fate).toBe(10);
                this.player2.pass();
                this.player1.clickCard(this.kakitaKaezin);
                this.player1.clickPrompt('1');
                expect(this.kakitaKaezin.location).toBe('play area');
                expect(this.kakitaKaezin.fate).toBe(1);
                expect(this.player1.fate).toBe(7);
            });

            it('should not discount characters played from hand', function() {
                this.nextPhase();
                this.nextPhase();
                expect(this.game.currentPhase).toBe('conflict');
                this.player1.clickCard(this.politicalRival);
                this.player1.clickPrompt('0');
                expect(this.politicalRival.location).toBe('play area');
                expect(this.player1.fate).toBe(7);
            });
        });
    });
});
