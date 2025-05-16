export interface Faction {
  id: string;
  name: string;
  key: string;
  color: string;
  description: string;
  iconUrl: string;
  bannerUrl: string;
}

export const factions: Faction[] = [
  {
    id: 'twilight-kingdom',
    name: 'Twilight Kingdom',
    key: 'twilightKingdom',
    color: '#264653',
    description: 'Disciplined warriors who harness ancient magics and advanced technology.',
    iconUrl: 'https://images.pexels.com/photos/6542703/pexels-photo-6542703.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bannerUrl: 'https://images.pexels.com/photos/6542661/pexels-photo-6542661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'mercenary-guild',
    name: 'Mercenary Guild',
    key: 'mercenaryGuild',
    color: '#E76F51',
    description: 'Ruthless hired guns with unmatched firepower and tactical versatility.',
    iconUrl: 'https://images.pexels.com/photos/8112140/pexels-photo-8112140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bannerUrl: 'https://images.pexels.com/photos/8112105/pexels-photo-8112105.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'first-temporal',
    name: 'First Temporal',
    key: 'firstTemporal',
    color: '#2A9D8F',
    description: 'Masters of time manipulation who strike with unnatural precision.',
    iconUrl: 'https://images.pexels.com/photos/3758105/pexels-photo-3758105.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bannerUrl: 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'drake-hold',
    name: 'Drake Hold',
    key: 'drakeHold',
    color: '#E9C46A',
    description: 'Beast tamers who ride massive drakes into battle with savage ferocity.',
    iconUrl: 'https://images.pexels.com/photos/4153330/pexels-photo-4153330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bannerUrl: 'https://images.pexels.com/photos/4153333/pexels-photo-4153333.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'northern-tribes',
    name: 'Northern Tribes',
    key: 'northernTribes',
    color: '#90A5C1',
    description: 'Fierce warriors from the frozen north, combining Orc brutality with Varank cunning.',
    iconUrl: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bannerUrl: 'https://images.pexels.com/photos/917494/pexels-photo-917494.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];